using System.ComponentModel.DataAnnotations;

public class CreateTransactionRequestDto {
    [Required, StringLength(150, MinimumLength = 1, ErrorMessage = "Tag name must be between 1 and 50 characters")]
    public string Name { get; set; }
    [Required]
    public float Amount { get; set; }
    [Required]
    public DateTime DateCreated { get; set; }

}