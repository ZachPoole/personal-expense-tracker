using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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

/* Transaction Endpoints */
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

/* Tag Endpoints */
var tagEndpoints = app.MapGroup("/tags");
tagEndpoints.MapGet("/", GetTags);
tagEndpoints.MapPost("/", CreateTag)
    .AddEndpointFilter<ValidationFilter<CreateTagRequestDto>>();
tagEndpoints.MapDelete("/{id}", DeleteTag);

/* ColorOptions Endpoints */
var colorOptionsEndpoints = app.MapGroup("/colorOptions");
colorOptionsEndpoints.MapGet("/", GetColorOptions);




static async Task<IResult> GetAllTransactions(PetDb db) {
    return TypedResults.Ok(await db.Transactions.ToListAsync());
}

static async Task<IResult> GetTransaction(Guid id, PetDb db) { 
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
    if (request.TagIds.Count() < 1) return TypedResults.BadRequest("Need tags ids to add tags to transaction");
    var tagIdsSet = new HashSet<Guid>(request.TagIds);
    
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



static async Task<IResult> GetTags(PetDb db) {
    return TypedResults.Ok(await db.Tags.ToListAsync());
}

static async Task<IResult> CreateTag(CreateTagRequestDto request, PetDb db, IMapper mapper) {
    var dbColorOption = db.ColorOptions.Find(request.ColorId);
    if(dbColorOption is null) return TypedResults.NotFound("Could not find ColorOption with specific ColorId");

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