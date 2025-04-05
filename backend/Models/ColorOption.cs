using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ColorOption {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    [Required]
    public string Color { get; set; }
    [Required]
    public int Order { get; set; }
    public virtual List<Tag> Tags { get; set; } = [];
}