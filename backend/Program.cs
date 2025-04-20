using System.Text.Json.Serialization;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("test");
builder.Services.AddDbContext<PetDb>(opt => opt.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.ConfigureHttpJsonOptions(options => {
    options.SerializerOptions.RespectRequiredConstructorParameters = true;

    // this is to stop json serializer from creating recursive object lookup
    // i.e. a tag that has a transaction that has a tag that has a transaction ..... 
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles; 
});

builder.Services.AddCors(options => {
    options.AddPolicy(name: "MyAllowSpecificOrigins",
    policy => {
        policy
            .WithOrigins("http://localhost:4200", "http://localhost:5129")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// add auto mapper profiles from assembly lookup
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swag => {
    swag.EnableAnnotations();
});
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "PetApi";
    config.Title = "PetAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

app.UseCors("MyAllowSpecificOrigins");

if(app.Environment.IsDevelopment()) {
    app.UseOpenApi();
    app.UseSwaggerUi(config => {
        config.DocumentTitle = "PetAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}


var api = app.MapGroup("/api");

api.MapDelete("/reset", ResetMockData).WithSummary("Delete current Transactions and Tags and add Mock Transactions back").WithOpenApi();

/* Transaction Endpoints */
var transactionEndpoints = api.MapGroup("/transactions").WithTags("Transactions");
transactionEndpoints.MapGet("/", GetAllTransactions).WithSummary("Get all Transactions").WithOpenApi();
transactionEndpoints.MapGet("/{id}", GetTransactionById).WithSummary("Get Transaction by Id").WithOpenApi();
transactionEndpoints.MapGet("/tagless", GetTaglessTransactions).WithSummary("Get all Tagless Transactions").WithOpenApi();
transactionEndpoints.MapPost("/tagSearch", FilterTransactionsByTags).WithSummary("Search all Transactions for matching Tags").WithOpenApi();
transactionEndpoints.MapPost("/", CreateTransaction)
    .AddEndpointFilter<ValidationFilter<CreateTransactionRequestDto>>()
    .WithSummary("Create Transaction").WithOpenApi();
transactionEndpoints.MapPut("/tags", UpdateTransactionTags)
    .AddEndpointFilter<ValidationFilter<UpdateTransactionTagsRequestDto>>()
    .WithSummary("Update the Tags on a Transaction").WithOpenApi();
transactionEndpoints.MapDelete("/{id}", DeleteTransaction).WithSummary("Delete Transaction").WithOpenApi();

/* Tag Endpoints */
var tagEndpoints = api.MapGroup("/tags").WithTags("Tags");
tagEndpoints.MapGet("/", GetTags).WithSummary("Get all Tags").WithOpenApi();
tagEndpoints.MapPost("/", CreateTag)
    .AddEndpointFilter<ValidationFilter<CreateTagRequestDto>>()
    .WithSummary("Create Tag").WithOpenApi();
tagEndpoints.MapDelete("/{id}", DeleteTag).WithSummary("Delete Tag").WithOpenApi();;

/* ColorOptions Endpoints */
var colorOptionsEndpoints = api.MapGroup("/colorOptions").WithTags("ColorOptions");
colorOptionsEndpoints.MapGet("/", GetColorOptions).WithSummary("Get all ColorOptions").WithOpenApi();




static async Task<IResult> GetAllTransactions(PetDb db) {
    return TypedResults.Ok(await db.Transactions
        .Include((transactions) => transactions.Tags)
        .ThenInclude((transactionsWithTags) => transactionsWithTags.Color)
        .ToListAsync());
}

static async Task<IResult> GetTransactionById(Guid id, PetDb db) { 
    if(id == Guid.Empty) return TypedResults.BadRequest("Id must not be an empty Guid");

    return await db.Transactions.FindAsync(id)
        is Transaction transaction 
            ? TypedResults.Ok(transaction)
            : TypedResults.NotFound();
}

static async Task<IResult> GetTaglessTransactions(PetDb db) {
    return TypedResults.Ok(await db.Transactions.Include(t => t.Tags).Where(t => !t.Tags.Any()).ToListAsync());
}

static async Task<IResult> CreateTransaction(CreateTransactionRequestDto request, PetDb db, IMapper mapper) {
    Transaction newDbTransaction = mapper.Map<Transaction>(request);

    db.Transactions.Add(newDbTransaction);
    await db.SaveChangesAsync();

    return TypedResults.Created($"/transactions/{newDbTransaction.Id}", newDbTransaction);
}

static async Task<IResult> UpdateTransactionTags(UpdateTransactionTagsRequestDto request, PetDb db) {
    if (request.TagsIds.Count() < 1) return TypedResults.BadRequest("Need tags ids to add tags to transaction");
    var tagIdsSet = new HashSet<Guid>(request.TagsIds);
    
    var dbTransaction = await db.Transactions.FindAsync(request.TransactionId);
    if (dbTransaction is null) return TypedResults.NotFound("Transaction not found for provided transaction Id");

    var dbTags = await db.Tags.Where(tag => tagIdsSet.Contains(tag.Id)).ToListAsync();

    dbTransaction.Tags = [.. dbTransaction.Tags, .. dbTags];
    await db.SaveChangesAsync();

    return TypedResults.NoContent();
}

static async Task<IResult> DeleteTransaction(Guid id, PetDb db) {
    if(id == Guid.Empty) return TypedResults.BadRequest("Id must not be an empty Guid");

    if (await db.Transactions.FindAsync(id) is Transaction transaction) {
        db.Transactions.Remove(transaction);
        await db.SaveChangesAsync();
        return TypedResults.NoContent();
    }

    return TypedResults.NotFound();
}

static async Task<IResult> FilterTransactionsByTags(List<Guid> tagsId, PetDb db) {
    var tagIdsSet = new HashSet<Guid>(tagsId);

    return TypedResults.Ok(
        await db.Transactions
            .Include(transaction => transaction.Tags)
            .Where(transaction => transaction.Tags.FindIndex(tag => tagIdsSet.Contains(tag.Id)) != -1)
            .ToListAsync()
    );
}

static IResult ResetMockData(PetDb db) {
    // clear out tables
    db.Database.ExecuteSqlRaw($"DELETE FROM dbo.TagTransaction");
    db.Database.ExecuteSqlRaw($"DELETE FROM dbo.Transactions");
    db.Database.ExecuteSqlRaw($"DELETE FROM dbo.Tags");

    // generate mock data again
    var mockTags = new List<Tag> 
    {
        new() { Id = Guid.NewGuid(), Name = "Food", ColorId = Guid.Parse("fe0b4683-f7f9-432d-8f14-a685d3e73e71") }, // Red 0
        new() { Id = Guid.NewGuid(), Name = "Essentials", ColorId = Guid.Parse("af4acbd3-6789-4dd5-8afa-710ca93b0077") }, // Orange 1
        new() { Id = Guid.NewGuid(), Name = "Utilities", ColorId = Guid.Parse("6513a135-199e-4613-8ea7-12c296e6d217") }, // Yellow 2
        new() { Id = Guid.NewGuid(), Name = "Entertainment", ColorId = Guid.Parse("5b0a3fc3-eebb-4713-ae3d-c846b00821cd") }, // Green 3
        new() { Id = Guid.NewGuid(), Name = "Transportation", ColorId = Guid.Parse("ea75a4cc-15be-46c3-a6bc-514d609ee777") }, // Indigo 4
        new() { Id = Guid.NewGuid(), Name = "Health", ColorId = Guid.Parse("d3f928a2-ae05-4eff-a68f-06fa4d7963e9") }, // Violet 5
        new() { Id = Guid.NewGuid(), Name = "Retail", ColorId = Guid.Parse("c35af576-e2f0-4835-8f81-ff80c68fa202") }, // Blue 6
        new() { Id = Guid.NewGuid(), Name = "Maintenance", ColorId = Guid.Parse("c35af576-e2f0-4835-8f81-ff80c68fa202") }, // Blue 7
    };

    db.Tags.AddRange(mockTags);


    var mockTransactions = new List<Transaction> 
    {
        new() { Id = Guid.NewGuid(), Name = "Grocery Shopping", Amount = 150.75F, DateCreated = new DateTime(2024, 3, 25, 10, 30, 0, DateTimeKind.Utc) },
        new() { Id = Guid.NewGuid(), Name = "Electric Bill", Amount = 90.25F, DateCreated = new DateTime(2024, 3, 20, 8, 15, 0, DateTimeKind.Utc) },
        new() { Id = Guid.NewGuid(), Name = "Dinner Out", Amount = 60.00F, DateCreated = new DateTime(2024, 3, 22, 19, 45, 0, DateTimeKind.Utc) },
        new() { Id = Guid.NewGuid(), Name = "Gas Refill", Amount = 45.00F, DateCreated = new DateTime(2024, 3, 18, 14, 30, 0, DateTimeKind.Utc) },
        new() { Id = Guid.NewGuid(), Name = "Gym Membership", Amount = 30.00F, DateCreated = new DateTime(2024, 3, 15, 7, 0, 0, DateTimeKind.Utc) },
        new() { Id = Guid.NewGuid(), Name = "Movie Night", Amount = 25.00F, DateCreated = new DateTime(2024, 3, 14, 20, 0, 0, DateTimeKind.Utc) },
        new() { Id = Guid.NewGuid(), Name = "Online Shopping", Amount = 120.50F, DateCreated = new DateTime(2024, 3, 10, 15, 25, 0, DateTimeKind.Utc) },
        new() { Id = Guid.NewGuid(), Name = "Car Repair", Amount = 300.00F, DateCreated = new DateTime(2024, 3, 8, 9, 45, 0, DateTimeKind.Utc) },
        new() { Id = Guid.NewGuid(), Name = "Rent Payment", Amount = 1200.00F, DateCreated = new DateTime(2024, 3, 1, 12, 0, 0, DateTimeKind.Utc) },
        new() { Id = Guid.NewGuid(), Name = "Concert Ticket", Amount = 75.00F, DateCreated = new DateTime(2024, 2, 28, 18, 30, 0, DateTimeKind.Utc) }
    };

    db.Transactions.AddRange(mockTransactions);
    db.SaveChanges();

    db.Transactions.ToList().ForEach(transaction =>
    {
        switch (transaction.Name)
        {
            case "Grocery Shopping":
                // No tags for Grocery Shopping
                break;
            case "Electric Bill":
                // No tags for Electric Bill
                break;
            case "Dinner Out":
                transaction.Tags.Add(mockTags[3]); // Entertainment
                transaction.Tags.Add(mockTags[0]); // Food
                break;
            case "Gas Refill":
                transaction.Tags.Add(mockTags[4]); // Transportation
                break;
            case "Gym Membership":
                transaction.Tags.Add(mockTags[5]); // Health
                break;
            case "Movie Night":
                transaction.Tags.Add(mockTags[3]); // Entertainment
                break;
            case "Online Shopping":
                transaction.Tags.Add(mockTags[6]); // Retail
                break;
            case "Car Repair":
                transaction.Tags.Add(mockTags[7]); // Maintenance
                break;
            case "Rent Payment":
                transaction.Tags.Add(mockTags[2]); // Utilities
                transaction.Tags.Add(mockTags[1]); // Essentials
                break;
            case "Concert Ticket":
                transaction.Tags.Add(mockTags[3]); // Entertainment
                break;
        }
    });

    db.SaveChanges();
    return TypedResults.Ok();
}


static async Task<IResult> GetTags(PetDb db, IMapper mapper) {
    return TypedResults.Ok(await db.Tags.Include(tags => tags.Color).ProjectTo<TagResponseDto>(mapper.ConfigurationProvider).ToListAsync());
}

static async Task<IResult> CreateTag(CreateTagRequestDto request, PetDb db, IMapper mapper) {
    var dbColorOption = db.ColorOptions.Find(request.ColorId);
    if(dbColorOption is null) return TypedResults.NotFound("Could not find ColorOption with specificed ColorId");

    Tag newDbTag = mapper.Map<Tag>(request);
    newDbTag.ColorId = dbColorOption.Id;

    db.Tags.Add(newDbTag);
    await db.SaveChangesAsync();

    TagResponseDto tagResponse =  mapper.Map<TagResponseDto>(newDbTag);
    return TypedResults.Created($"/tags/{newDbTag.Id}", tagResponse);
}

static async Task<IResult> DeleteTag(Guid id, PetDb db) {
    if(id == Guid.Empty) return TypedResults.BadRequest("Id must not be an empty Guid");

    if (await db.Tags.FindAsync(id) is Tag tag)
    {
        db.Tags.Remove(tag);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return TypedResults.NotFound();
}

static async Task<IResult> GetColorOptions(PetDb db, IMapper mapper) {
    return TypedResults.Ok(await db.ColorOptions.ProjectTo<GetColorOptionsResponseDto>(mapper.ConfigurationProvider).OrderBy(co => co.Order).ToListAsync());
}


app.Run();