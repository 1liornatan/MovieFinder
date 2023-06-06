using Microsoft.AspNetCore.Mvc;
using MovieFinder.Server.DTOs;
using MovieFinder.Server.Services.Abstractions;

namespace MovieFinder.Server.Controllers;

/*
   This is the app's controller, it defines the required methods for the web app
   - SearchMoviesByTitle: gets a search result using a movie's title
   - GetMovieById: gets all information on a movie using it's ID
*/
[ApiController]
[Route("[controller]")]
public class MovieController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MovieController(IMovieService movieService)
    {
        _movieService = movieService;
    }
    
    [HttpGet("search")]
    public async Task<ActionResult> SearchMoviesByTitle(string id, int page, int year)
    {
        var movieSearchDto = new MovieSearchDto(id, page, year);
        var searchMovieByTitle = await _movieService.SearchMovieByTitle(movieSearchDto);
        
        return Ok(searchMovieByTitle);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult> GetMovieById(string id)
    {
        var movieData = await _movieService.SearchMovieById(id);

        return Ok(movieData);
    }
}