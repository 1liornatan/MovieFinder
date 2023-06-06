namespace MovieFinder.Server.DTOs;

public class MovieSearchDto
{
    public string Title { get; set; }
    public int Page { get; set; }
    public int Year { get; set; }

    public MovieSearchDto(string title, int page, int year)
    {
        this.Title = title;
        this.Page = page;
        this.Year = year;
    }
}