

using System.ComponentModel.DataAnnotations;

public class ValidationFilter<T> : IEndpointFilter where T : class {
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next) {
        var obj = context.Arguments.OfType<T>().FirstOrDefault();
        if (obj is null) return Results.BadRequest("Invalid request body");

        var validationContext = new ValidationContext(obj);
        var validationResults = new List<ValidationResult>();

        if (!Validator.TryValidateObject(obj, validationContext, validationResults, true))
            return Results.BadRequest(validationResults.Select(vr => vr.ErrorMessage));

        return await next(context);
    }
}