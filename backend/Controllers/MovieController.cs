using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Writers;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class MovieController: ControllerBase
{
    private readonly MovieDbContext _context;
    private readonly ILogger<MovieController> _logger;

    public MovieController(ILogger<MovieController> logger, MovieDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet(Name = "GetMovies")]
    public ActionResult<IEnumerable<MovieDB>> Get(
        [FromQuery] string? s,
        [FromQuery] string? type,
        [FromQuery] string? y,
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 5
    ) {
    try
        {
            if (s == "") {
                return StatusCode(400, "Bad Request");
            }
            
            var movies = _context.Movies.Where(m => m.Title.Contains(s.ToLower()));

            if (type != null) {
                movies = movies.Where(m => m.Type == type);
            }

            if (y != null) {
                movies = movies.Where(m => m.Year == y);
            }

            var totalMovies = movies.Count();
            var totalPages = Math.Ceiling((double)totalMovies / pageSize);

            IEnumerable<MovieDB> resultSkip = movies.Skip(pageSize * (pageNumber - 1));
            IEnumerable<MovieDB> resultTake = resultSkip.Take(pageSize);

            if (resultTake.ToList().Count == 0) {
                return StatusCode(204, "No Content");
            }

            return Ok(resultTake);
        }
    catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching movies");
            return StatusCode(500, "Internal server error");
        }
    }

    // [HttpPost(Name = "PostMovie")]
    // public ActionResult<> Post([FromQuery] string movieTitle) {
    //     try 
    //     {

    //     }
    //     catch (Exception ex)
    //     {

    //     }
    // }
}