using System.ComponentModel.DataAnnotations;

public class IsGuidAndNotEmpty : ValidationAttribute {

    public IsGuidAndNotEmpty() : base("The {0} field must be a valid and not empty Guid") { }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var invalidResponse = new ValidationResult(ErrorMessage ?? $"{validationContext.DisplayName} must be a valid and not empty Guid");
        
        if (value is null) 
            return ValidationResult.Success; // this isn't a null check attribute, use Required attribute

        if (
            value!.GetType() == Type.GetType("System.Guid") &&
            (Guid)value == Guid.Empty
        ) return invalidResponse;
        
        if (
            value is string stringValue && 
            !Guid.TryParse(stringValue, out _)
        ) return invalidResponse;
                  

        return ValidationResult.Success;
    }
}