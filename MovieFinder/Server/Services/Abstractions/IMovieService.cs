using MovieFinder.Server.DTOs;
using MovieFinder.Server.Model;
using MovieFinder.Server.Payload.Response;
using MovieFinder.Server.Services.Response;

namespace MovieFinder.Server.Services.Abstractions;

public interface IMovieService
{
    Task<ServiceResponse<MovieSearch?>> SearchMovieByTitle(MovieSearchDto movieSearchDto);
    Task<Movie?> SearchMovieById(string id);
}