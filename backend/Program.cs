using System.Text.Json.Serialization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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

// add auto mapper profiles from assembly lookup
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "PetApi";
    config.Title = "PetAPI v1";
    config.Version = "v1";
});


var app = builder.Build();

if(app.Environment.IsDevelopment()) {
    app.UseOpenApi();
    app.UseSwaggerUi(config => {
        config.DocumentTitle = "PetAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}


var transactionEndpoints = app.MapGroup("/transactions");

transactionEndpoints.MapGet("/", GetAllTransactions);
transactionEndpoints.MapGet("/{id}", GetTransaction);
transactionEndpoints.MapPost("/tagless", GetTaglessTransactions);
transactionEndpoints.MapPost("/tagSearch", FilterTransactionsByTags);
transactionEndpoints.MapPost("/", CreateTransaction)
    .AddEndpointFilter<ValidationFilter<CreateTransactionRequestDto>>();
transactionEndpoints.MapPut("/tags", UpdateTransactionTags)
    .AddEndpointFilter<ValidationFilter<UpdateTransactionTagsRequestDto>>();
transactionEndpoints.MapDelete("/{id}", DeleteTransaction);


static async Task<IResult> GetAllTransactions(PetDb db) {
    return TypedResults.Ok(await db.Transactions.ToListAsync());
}

static async Task<IResult> GetTransaction(Guid id, PetDb db) { 
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
    if (request.TagIds.Count() < 1) return TypedResults.BadRequest("Need tags ids to add tags to transaction");
    var tagIdsSet = new HashSet<Guid>(request.TagIds);
    
    var dbTransaction = await db.Transactions.FindAsync(request.TransactionId);
    if (dbTransaction is null) return TypedResults.NotFound("Transaction not found for provided transaction Id");

    var dbTags = await db.Tags.Where(tag => tagIdsSet.Contains(tag.Id)).ToListAsync();

    dbTransaction.Tags = [.. dbTransaction.Tags, .. dbTags];
    await db.SaveChangesAsync();

    return TypedResults.NoContent();
};


static async Task<IResult> DeleteTransaction(Guid id, PetDb db) {
    if (await db.Transactions.FindAsync(id) is Transaction transaction) {
        db.Transactions.Remove(transaction);
        await db.SaveChangesAsync();
        return TypedResults.NoContent();
    }

    return TypedResults.NotFound();
}

static async Task<IResult> FilterTransactionsByTags([FromBody]List<Guid> tagsId, PetDb db) {
    var tagIdsSet = new HashSet<Guid>(tagsId);

    return TypedResults.Ok(
        await db.Transactions
            .Include(transaction => transaction.Tags)
            .Where(transaction => transaction.Tags.FindIndex(tag => tagIdsSet.Contains(tag.Id)) != -1)
            .ToListAsync()
    );
}





/* Tag Endpoints */

// get all tags
app.MapGet("/tags", async (PetDb db) =>
    await db.Tags.ToListAsync());


// create new tag
app.MapPost("/tags", async (CreateTagRequestDto request, PetDb db, IMapper mapper) =>
{   
    var dbColorOption = db.ColorOptions.Find(request.ColorId);
    if(dbColorOption is null) return TypedResults.NotFound("Could not find ColorOption with specific ColorId");

    Tag newDbTag = mapper.Map<Tag>(request);
    newDbTag.ColorId = dbColorOption.Id;

    db.Tags.Add(newDbTag);
    await db.SaveChangesAsync();

    TagResponseDto tagResponse =  mapper.Map<TagResponseDto>(newDbTag);
    return Results.Created($"/tags/{newDbTag.Id}", tagResponse);
})
.AddEndpointFilter<ValidationFilter<CreateTagRequestDto>>();

app.MapDelete("/tags/{id}", async (Guid id, PetDb db) =>
{
    if (await db.Tags.FindAsync(id) is Tag tag)
    {
        db.Tags.Remove(tag);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});



app.MapGet("/colorOptions", async (PetDb db) => await db.ColorOptions.Select(co => new GetColorOptionsResponseDto {
    Id = co.Id,
    Color = co.Color,
    Order = co.Order
}).OrderBy(co => co.Order).ToListAsync());


app.Run();