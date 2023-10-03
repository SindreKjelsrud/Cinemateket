#nullable disable

namespace backend;

public class MovieResponse
{

    public MovieResponse(string Response, int TotalResults, IEnumerable<MovieDB> Search) {
        this.Response = Response;
        this.TotalResults = TotalResults;
        this.Search = Search;
    }

    public string Response { get; set; }

    public int TotalResults { get; set; }

    public IEnumerable<MovieDB> Search { get; set; }
}
