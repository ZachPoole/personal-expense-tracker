using System.ComponentModel.DataAnnotations;

public class UpdateTransactionTagsRequestDto {
    [Required, IsGuidAndNotEmpty]
    public Guid TransactionId { get; set; }
    [Required]
    public List<Guid> TagsIds { get; set; } = [];
}