using Xunit;
using Moq;
using backend;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class MovieControllerTests
{
    private readonly Mock<ILogger<MovieController>> _mockLogger;
    private readonly Mock<MovieDbContext> _mockDbContext;

    public MovieControllerTests()
    {
        _mockLogger = new Mock<ILogger<MovieController>>();
        var options = new DbContextOptionsBuilder<MovieDbContext>()
            .UseInMemoryDatabase(databaseName: "MovieDatabase")
            .Options;
        _mockDbContext = new Mock<MovieDbContext>(options);
    }

    [Fact]
    public void GetMovies_ValidQueryParams_ReturnsOk()
    {
        // Arrange
        var controller = new MovieController(_mockLogger.Object, _mockDbContext.Object);

        // Act
        var result = controller.Get("Star Wars", "movie", "2021", "titleasc", 1, 5);

        // Assert
        Assert.IsType<OkObjectResult>(result.Result);
    }

}