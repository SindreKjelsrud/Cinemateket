using backend;
using Microsoft.EntityFrameworkCore;

public class MovieDbContext: DbContext
{
    public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
    {
    }

    public DbSet<MovieDB> Movies { get; set; }
}