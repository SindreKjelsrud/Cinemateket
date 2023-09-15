using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class MovieController: ControllerBase
{
    private readonly ILogger<MovieController> _logger;

    public MovieController(ILogger<MovieController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetMovie")]
    public IEnumerable<Movie> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new Movie
        {
            Title = "Title",
            Year = "Year",
            imdbID = "imdbID",
            Type = "Type",
            Poster = "Poster"
        })
        .ToArray();
    }
}