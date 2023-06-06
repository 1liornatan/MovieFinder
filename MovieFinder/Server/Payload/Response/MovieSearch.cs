using System.Text.Json.Serialization;
using MovieFinder.Server.Model;

namespace MovieFinder.Server.Payload.Response;

public class MovieSearch
{
    public IEnumerable<MovieMetaData>? Search { get; set; }
    [JsonPropertyName("totalResults")]
    public string? TotalResults { get; set; }
    public string? Response { get; set; }
}