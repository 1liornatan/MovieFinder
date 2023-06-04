using MovieFinder.Payload.Response;
using MovieFinder.Services.Response;

namespace MovieFinder.Services.Abstractions;

public interface IMovieService
{
    Task<ServiceResponse<MovieSearch>> SearchMovieByTitle(string title, int page);
}