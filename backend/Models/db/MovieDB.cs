#nullable disable

using Microsoft.EntityFrameworkCore;

namespace backend;

[PrimaryKey(nameof(Id))]
public class MovieDB
{
    public int Id { get; set; }

    public string Title { get; set; }

    public string Year { get; set; }

    public string imdbID { get; set; }

    public string Type { get; set; }

    public string Poster { get; set; }
}