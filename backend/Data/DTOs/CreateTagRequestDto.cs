using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

public class CreateTagRequestDto {
    [Required, StringLength(15, MinimumLength = 1, ErrorMessage = "Tag name must be between 1 and 15 characters")]
    public string? Name { get; set; }
    [Required, IsGuidAndNotEmpty]
    public Guid ColorId { get; set; }
}

