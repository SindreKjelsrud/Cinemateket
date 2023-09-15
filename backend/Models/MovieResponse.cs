#nullable disable

namespace backend;

public class MovieResponse
{
    public string Response { get; set; }

    public string TotalResults { get; set; }

    public List<Movie> Search { get; set; }
}
