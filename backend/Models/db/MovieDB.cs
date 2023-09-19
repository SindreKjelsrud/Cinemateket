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
}