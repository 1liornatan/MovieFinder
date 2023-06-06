using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
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
    
    public async Task<ServiceResponse<MovieSearch>> SearchMovieByTitle(string title, int page = 1, int year = -1)
    {
        var s = title.Replace(' ', '+');
        var httpClient = _httpClientFactory.CreateClient("OMDb");
        var httpClientBaseAddress = httpClient.BaseAddress + "type=movie&s=" + s + "&page=" + page;

        if (year > 0)
            httpClientBaseAddress += "&y=" + year;
        
        var httpResponseMessage = await httpClient.GetAsync(httpClientBaseAddress);

        httpResponseMessage.EnsureSuccessStatusCode();
        using var contentStream = httpResponseMessage.Content.ReadAsStreamAsync();
        
        var results = await JsonSerializer.DeserializeAsync<MovieSearch>(await contentStream);
        return new ServiceResponse<MovieSearch>(results);
    }
}