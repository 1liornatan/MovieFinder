using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using MovieFinder.Services;
using MovieFinder.Services.Abstractions;

namespace MovieFinder.Controllers;

[ApiController]
[Route("[controller]")]
public class MovieController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IMovieService _movieService;

    public MovieController(IHttpClientFactory httpClientFactory, IMovieService movieService)
    {
        _httpClientFactory = httpClientFactory;
        _movieService = movieService;
    }
    
    [HttpGet("{id?}/{page:int?}")]
    public async Task<ActionResult> OnGet(string id, int page)
    {
        var searchMovieByTitle = await _movieService.SearchMovieByTitle(id, page);
        return Ok(searchMovieByTitle);
    }
    
    [HttpGet("{id?}")]
    public async Task<ActionResult> OnGet(string id)
    {
        var httpClient = _httpClientFactory.CreateClient("OMDb");
        var httpResponseMessage = await httpClient.GetAsync(httpClient.BaseAddress + "i=" + id);

        httpResponseMessage.EnsureSuccessStatusCode();
        using var contentStream = httpResponseMessage.Content.ReadAsStreamAsync();
            
        var movie = await JsonSerializer.DeserializeAsync<Movie>(await contentStream);

        return Ok(movie);
    }
    
    
}