using System.Text.Json;
using MovieFinder.Server.DTOs;
using MovieFinder.Server.Model;
using MovieFinder.Server.Payload.Response;
using MovieFinder.Server.Services.Abstractions;
using MovieFinder.Server.Services.Response;

namespace MovieFinder.Server.Services;

/* This service is responsible for using OMDb API to
   get the required information on the movies */
public class MovieService : IMovieService
{
    private readonly IHttpClientFactory _httpClientFactory;
    public MovieService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }
    
    public async Task<ServiceResponse<MovieSearch?>> SearchMovieByTitle(MovieSearchDto movieSearchDto)
    {
        var year = movieSearchDto.Year;
        var s = movieSearchDto.Title.Replace(' ', '+');
        var httpClient = _httpClientFactory.CreateClient("OMDb");
        var httpClientBaseAddress = httpClient.BaseAddress + "type=movie&s=" + s + "&page=" + movieSearchDto.Page;

        if (year > 0)
            httpClientBaseAddress += "&y=" + year;
        
        var httpResponseMessage = await httpClient.GetAsync(httpClientBaseAddress);

        httpResponseMessage.EnsureSuccessStatusCode();
        using var contentStream = httpResponseMessage.Content.ReadAsStreamAsync();
        
        var results = await JsonSerializer.DeserializeAsync<MovieSearch>(await contentStream);
        return new ServiceResponse<MovieSearch?>(results);
    }

    public async Task<Movie?> SearchMovieById(string id)
    {
        var httpClient = _httpClientFactory.CreateClient("OMDb");
        var httpResponseMessage = await httpClient.GetAsync(httpClient.BaseAddress + "i=" + id);

        httpResponseMessage.EnsureSuccessStatusCode();
        using var contentStream = httpResponseMessage.Content.ReadAsStreamAsync();
            
        var movie = await JsonSerializer.DeserializeAsync<Movie>(await contentStream);

        return movie;
    }
}