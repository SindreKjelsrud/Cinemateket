#nullable disable

using Microsoft.EntityFrameworkCore;
using CsvHelper.Configuration;
using System.Globalization;

namespace backend;

[PrimaryKey(nameof(imdbID))]
public class MovieDB
{
    public string Title { get; set; }

    public string Year { get; set; }

    public string imdbID { get; set; }

    public string Type { get; set; }

    public string Poster { get; set; }

    public MovieDB(string Title, string Year, string imdbID, string Type, string Poster) {
        this.Title = Title;
        this.Year = Year;
        this.imdbID = imdbID;
        this.Type = Type;
        this.Poster = Poster;
    }
}