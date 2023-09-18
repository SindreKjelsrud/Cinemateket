#nullable disable

using Microsoft.EntityFrameworkCore;
using CsvHelper.Configuration;
using System.Globalization;

namespace backend;

// [PrimaryKey(nameof(Id))]
public class MovieDB
{
    public int Id { get; set; }

    public string Title { get; set; }

    public string Year { get; set; }

    public string imdbID { get; set; }

    public string Type { get; set; }

    public string Poster { get; set; }
}


public class MovieDBMap : ClassMap<MovieDB>
{
    public MovieDBMap()
    {
        AutoMap(CultureInfo.InvariantCulture);
        Map(m => m.Id).Ignore();
    }
}