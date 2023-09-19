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

    [HttpGet(Name = "GetMovie")]
    public IEnumerable<MovieDB> Get()
    {
        return _context.Movies.ToList();
    }
}