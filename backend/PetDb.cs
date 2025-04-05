
using Microsoft.EntityFrameworkCore;

class PetDb : DbContext {
    public PetDb(DbContextOptions<PetDb> options): base(options) { }

    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<Tag> Tags => Set<Tag>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ColorOption>(b => {
            b.Property(x => x.Color).IsRequired();
            b.HasData(
                new ColorOption { Id = Guid.Parse("fe0b4683-f7f9-432d-8f14-a685d3e73e71"), Color = "Red", Order = 1 },
                new ColorOption { Id = Guid.Parse("af4acbd3-6789-4dd5-8afa-710ca93b0077"), Color = "Orange", Order = 2 },
                new ColorOption { Id = Guid.Parse("6513a135-199e-4613-8ea7-12c296e6d217"), Color = "Yellow", Order = 3 },
                new ColorOption { Id = Guid.Parse("5b0a3fc3-eebb-4713-ae3d-c846b00821cd"), Color = "Green", Order = 4 },
                new ColorOption { Id = Guid.Parse("c35af576-e2f0-4835-8f81-ff80c68fa202"), Color = "Blue", Order = 5 },
                new ColorOption { Id = Guid.Parse("ea75a4cc-15be-46c3-a6bc-514d609ee777"), Color = "Indigo", Order = 6 },
                new ColorOption { Id = Guid.Parse("d3f928a2-ae05-4eff-a68f-06fa4d7963e9"), Color = "Violet", Order = 7 },
                new ColorOption { Id = Guid.Parse("add6e376-c3b5-45d2-9ef2-2eca3bbc8b79"), Color = "Pink", Order = 8 }
            );
               
        });
    }


}