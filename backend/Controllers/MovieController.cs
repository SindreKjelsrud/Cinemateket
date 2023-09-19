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
    public ActionResult<IEnumerable<MovieDB>> Get([FromQuery]int pageNumber = 1, [FromQuery] int pageSize = 5)
    {
    try
        {
            var movies = _context.Movies.ToList();
            return Ok(movies);
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