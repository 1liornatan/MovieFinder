namespace MovieFinder.Payload.Response;

public class MovieSearch
{
    public IEnumerable<MovieMetaData> Search { get; set; }
    public string totalResults { get; set; }
    public string Response { get; set; }
}