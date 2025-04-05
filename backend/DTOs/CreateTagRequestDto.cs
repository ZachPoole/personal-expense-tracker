using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class CreateTagRequestDto {
    [Required]
    public string Name { get; set; }
    [Required]
    public Guid ColorId { get; set; }
}