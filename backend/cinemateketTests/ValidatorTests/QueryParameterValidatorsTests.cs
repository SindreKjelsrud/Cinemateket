using Xunit;
using backend;


public class QueryParameterValidatorsTests
{
    [Theory]
    [InlineData("Star Wars", true)]
    [InlineData("", false)]
    [InlineData(null, false)]
    public void IsValidS_ShouldReturnExpectedResult(string input, bool expectedResult)
    {
        bool result = QueryParameterValidators.IsValidS(input);
        Assert.Equal(expectedResult, result);
    }

    // Add more tests for other validators
}