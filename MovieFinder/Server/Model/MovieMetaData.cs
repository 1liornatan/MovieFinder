using System.Text.Json.Serialization;

namespace MovieFinder.Server.Model;

public class MovieMetaData
{
    public string? Title { get; set; }
    public string? Year { get; set; }
    [JsonPropertyName("imdbID")]
    public string? ImdbId { get; set; }
    public string? Type { get; set; }
    public string? Poster { get; set; }
}