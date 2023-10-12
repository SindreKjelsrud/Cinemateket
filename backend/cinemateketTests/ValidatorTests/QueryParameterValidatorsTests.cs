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

        [Theory]
        [InlineData("movie", true)]
        [InlineData("series", true)]
        [InlineData("episode", true)]
        [InlineData("unknown", false)]
        [InlineData(null, true)]
        public void IsValidType_ShouldReturnExpectedResult(string input, bool expectedResult)
        {
            bool result = QueryParameterValidators.IsValidType(input);
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData("2021", true)]
        [InlineData("1899", false)]
        [InlineData(null, true)]
        public void IsValidYear_ShouldReturnExpectedResult(string input, bool expectedResult)
        {
            bool result = QueryParameterValidators.IsValidYear(input);
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData("titleasc", true)]
        [InlineData("titledesc", true)]
        [InlineData("unknown", false)]
        [InlineData(null, true)]
        public void IsValidSort_ShouldReturnExpectedResult(string input, bool expectedResult)
        {
            bool result = QueryParameterValidators.IsValidSort(input);
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData(1, true)]
        [InlineData(0, false)]
        [InlineData(-1, false)]
        public void IsValidPageNumber_ShouldReturnExpectedResult(int input, bool expectedResult)
        {
            bool result = QueryParameterValidators.IsValidPageNumber(input);
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData(1, true)]
        [InlineData(100, true)]
        [InlineData(0, false)]
        [InlineData(101, false)]
        public void IsValidPageSize_ShouldReturnExpectedResult(int input, bool expectedResult)
        {
            bool result = QueryParameterValidators.IsValidPageSize(input);
            Assert.Equal(expectedResult, result);
        }
}