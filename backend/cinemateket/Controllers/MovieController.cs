using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Writers;

namespace backend;
using static backend.QueryParameterValidators;

[ApiController]
[Route("[controller]")]
public class MovieController: ControllerBase
{
    private readonly MovieDbContext _context;
    private readonly ILogger<MovieController> _logger;
    private static readonly string[] sortTypes = new[]
    {
        "titleasc", "titledesc", "yearasc", "yeardesc"
    };

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
        [FromQuery] string? sort,
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 5
    ) {
    try
        {
            var movies = _context.Movies.AsQueryable();
            if (s != null) {
                if (!IsValidS(s)) return StatusCode(400, "Bad Request: Invalid title");
                movies = _context.Movies.Where(m => m.Title.ToLower().Contains(s.ToLower()));
            }

            if (type != null) {
                if (!IsValidType(type)) return StatusCode(400, "Bad Request: Invalid type");
                movies = movies.Where(m => m.Type == type);
            }

            if (y != null) {
                if (!IsValidYear(y)) return StatusCode(400, "Bad Request: Invalid year");
                movies = movies.Where(m => m.Year == y);
            }

            if (sort != null) {
                if (!IsValidSort(sort)) return StatusCode(400, "Bad Request: Invalid sort-type");
                if (sort == "titleasc") movies = movies.OrderBy(m => m.Title);
                if (sort == "titledesc") movies = movies.OrderByDescending(m => m.Title);
                if (sort == "yearasc") movies = movies.OrderBy(m => m.Year);
                if (sort == "yeardesc") movies = movies.OrderByDescending(m => m.Year);
            }   


            if (!IsValidPageNumber(pageNumber) || !IsValidPageSize(pageSize)) 
                return StatusCode(400, "Bad Request: Invalid page-size or page-number");

            var totalMovies = movies.Count();
            var totalPages = Math.Ceiling((double)totalMovies / pageSize);
            
            IEnumerable<MovieDB> resultSkip = movies.Skip(pageSize * (pageNumber - 1));
            IEnumerable<MovieDB> resultTake = resultSkip.Take(pageSize);

            if (resultTake.ToList().Count == 0) {
                return StatusCode(204, "No Content");
            }

            MovieResponse Response = new MovieResponse("OK", totalMovies, pageNumber ,resultTake);

            return Ok(Response);
        }
    catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching movies");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost(Name = "PostMovie")]
    public ActionResult Post(
        [FromQuery] string s, 
        [FromQuery] string y,
        [FromQuery] string imdbID,
        [FromQuery] string type,
        [FromQuery] string poster
    ) {
        try 
        {
            MovieDB newMovie = new(s, y, imdbID, type, poster);
            var movies = _context.Movies.Where(m => m.imdbID.ToLower().Contains(imdbID.ToLower()));
            if (movies.Count() == 0) {
                _context.Add(newMovie);
                _context.SaveChanges();
                return Ok("Successfully added new movie");
            } 
            return StatusCode(409, "Conflict, imdbID already exists");
            
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error posting movie");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete(Name = "DeleteMovie")]
    public ActionResult Delete([FromQuery] string imdbID) {
        try 
        {
            var movie = _context.Movies.AsEnumerable()
                        .Where(m => m.imdbID.ToLower().Contains(imdbID.ToLower()))
                        .SingleOrDefault();
            if (movie != null) {
                _context.Remove(movie);
                _context.SaveChanges();
                return Ok("Successfully deleted movie");
            } 
            return StatusCode(409, "Conflict, imdbID doesn't exists");
            
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting movie");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut(Name = "PutMovie")]
    public ActionResult Put(
        [FromQuery] string? s, 
        [FromQuery] string? y,
        [FromQuery] string imdbID,
        [FromQuery] string? type,
        [FromQuery] string? poster
    ) {
        try 
        {
            var movie = _context.Movies.AsEnumerable()
                        .Where(m => m.imdbID.ToLower().Contains(imdbID.ToLower()))
                        .SingleOrDefault();
            if (movie != null) {
                if (s != null) movie.Title = s;
                if (y != null) movie.Year = y;
                if (type != null) movie.Type = type;
                if (poster != null) movie.Poster = poster;
                _context.SaveChanges();
                return Ok("Successfully edited movie");
            }
            return StatusCode(404, "Conflict, imdbID doesn't exists");
            
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting movie");
            return StatusCode(500, "Internal server error");
        }
    }
}