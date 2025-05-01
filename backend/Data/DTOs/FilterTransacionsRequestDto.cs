using System.ComponentModel.DataAnnotations;

public class FilterTransactionsByTagsRequest {
    [Required]
    public List<Guid> TagsIds { get; set; } = [];
}