using System.Text.Json;
using MovieFinder.Payload.Response;
using MovieFinder.Services.Abstractions;
using MovieFinder.Services.Response;

namespace MovieFinder.Services;


public class MovieService : IMovieService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public MovieService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }
    
    public async Task<ServiceResponse<MovieSearch>> SearchMovieByTitle(string title, int page = 1)
    {
        var s = title.Replace(' ', '+');
        var httpClient = _httpClientFactory.CreateClient("OMDb");
        var httpResponseMessage = await httpClient.GetAsync(httpClient.BaseAddress + "s=" + s + "&page=" + page);

        httpResponseMessage.EnsureSuccessStatusCode();
        using var contentStream = httpResponseMessage.Content.ReadAsStreamAsync();
        
        var results = await JsonSerializer.DeserializeAsync<MovieSearch>(await contentStream);
        return new ServiceResponse<MovieSearch>(results);
    }
}