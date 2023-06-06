namespace MovieFinder.Server.Services.Response;

public class ServiceResponse<T>
{
    public ServiceResponse(T data)
    {
        Data = data;
        Success = data != null;
        Message = data != null ? "Success":"Failure";
    }

    public T Data { get; set; }
    public bool Success { get; set; } = true;
    public string Message { get; set; }
    public string? Error { get; set; } = null;
    public List<string>? ErrorMessages { get; set; } = null;
}