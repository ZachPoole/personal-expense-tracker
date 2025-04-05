using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Transaction {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public float Amount { get; set; }
    [Required]
    public DateTime DateCreated { get; set; }
    public virtual List<Tag> Tags { get; set; } = [];

}