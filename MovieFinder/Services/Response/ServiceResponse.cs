using MovieFinder.Payload.Response;

namespace MovieFinder.Services.Response;

public class ServiceResponse<T>
{
    public ServiceResponse(T data)
    {
        Data = data;
        Success = data != null ? true:false;
        Message = data != null ? "Success":"Failure";
    }

    public T Data { get; set; }
    public bool Success { get; set; } = true;
    public string Message { get; set; } = null;
    public string Error { get; set; } = null;
    public List<string> ErrorMessages { get; set; } = null;
}