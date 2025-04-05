using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Tag {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public ColorOption Color { get; set; }
    public List<Transaction> Transactions { get; set; } = [];

    public override bool Equals(object? obj)
    {
        return base.Equals(obj);
    }

    public bool Equals(Tag tag) {
        if (tag is null) return false;
        if(ReferenceEquals(this, tag)) return true;
        if(GetType() != tag.GetType()) return false;

        return tag.Id == Id;
    }
}