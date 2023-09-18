using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using CsvHelper;
using backend;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuration = builder.Configuration; 

builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

var services = builder.Services.BuildServiceProvider();
using (var scope = services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MovieDbContext>();
    context.Database.EnsureCreated();

    // Check if movies are already inserted to avoid duplicate insertion
    if (!context.Movies.Any())
    {
        using (var reader = new StreamReader("public/DbMockData.csv"))
        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
        {
            csv.Context.RegisterClassMap<MovieDBMap>();
            var records = csv.GetRecords<MovieDB>().ToList();
            context.Movies.AddRange(records);
            context.SaveChanges();
        }
    }
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
