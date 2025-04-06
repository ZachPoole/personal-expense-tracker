using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("test");
builder.Services.AddDbContext<PetDb>(opt => opt.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.ConfigureHttpJsonOptions(options => {
    options.SerializerOptions.RespectRequiredConstructorParameters = true;
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

// create new transaction
app.MapPost("/transactions", async (Transaction transaction, PetDb db) =>
{
    db.Transactions.Add(transaction);
    await db.SaveChangesAsync();

    return Results.Created($"/transactions/{transaction.Id}", transaction);
});

// get all transactions
app.MapGet("/transactions", async (PetDb db) =>
    await db.Transactions.ToListAsync());


// get all transactions that don't have tags
app.MapGet("/transactions/tagless", async (PetDb db) =>
    await db.Transactions.Where(t => t.Tags.Count() == 0).ToListAsync()
);


// update tags on transaction
app.MapPut("/transactions/{transactionId}", async (Guid transactionId, Guid tagId, PetDb db) =>
{
    var transaction = await db.Transactions.FindAsync(transactionId);
    if (transaction is null) return Results.NotFound();

    var tag = await db.Tags.FindAsync(tagId);
    if(tag is null) return Results.NotFound();

    transaction.Tags.Add(tag);
    Console.WriteLine(transaction.ToString());

    await db.SaveChangesAsync();

    return Results.NoContent();
});

// app.MapDelete("/todoitems/{id}", async (int id, TodoDb db) =>
// {
//     if (await db.Todos.FindAsync(id) is Todo todo)
//     {
//         db.Todos.Remove(todo);
//         await db.SaveChangesAsync();
//         return Results.NoContent();
//     }

//     return Results.NotFound();
// });


app.MapPost("/transaction/tagSearch", ([FromBody]List<Guid> inputTagsIds, PetDb db) =>
    db.Transactions.ToList().Where(transaction => transaction.Tags?.FindIndex(tag => inputTagsIds.Contains(tag.Id)) == -1)
);




/* Tag Endpoints */

// get all tags
app.MapGet("/tags", async (PetDb db) =>
    await db.Tags.ToListAsync());


// create new tag
app.MapPost("/tags", async (CreateTagRequestDto newTagRequest, PetDb db, IMapper mapper) =>
{   
    var dbColorOption = db.ColorOptions.Find(newTagRequest.ColorId);
    if(dbColorOption is null) return TypedResults.NotFound("Could not find ColorOption with specific ColorId");

    Tag newDbTag = mapper.Map<Tag>(newTagRequest);
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