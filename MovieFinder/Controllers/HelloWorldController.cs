using System.Text.Json;
using Lombok.NET;
using Microsoft.AspNetCore.Mvc;

namespace MovieFinder.Controllers;

[ApiController]
[Route("[controller]")]
public class HelloWorldController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public HelloWorldController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }
    
    public async Task<ActionResult> OnGet()
    {
        var httpClient = _httpClientFactory.CreateClient("OMDb");
        var httpResponseMessage = await httpClient.GetAsync(httpClient.BaseAddress + "i=tt3896198");

        httpResponseMessage.EnsureSuccessStatusCode();
        using var contentStream = httpResponseMessage.Content.ReadAsStreamAsync();
            
        var movie = await JsonSerializer.DeserializeAsync<Movie>(await contentStream);

        return Ok(movie);
    }
}