namespace backend;

public static class QueryParameterValidators
{
    private static readonly string[] sortTypes = new[]
    {
        "titleasc", "titledesc", "yearasc", "yeardesc"
    };

    private static readonly string[] movieTypes = new[]
    {
        "movie", "series", "episode"
    };


    // Assuming `s` is a non-nullable parameter and can be any string
    // If there are specific requirements for `s`, additional validation can be added
    public static bool IsValidS(string s)
    {
        return !string.IsNullOrWhiteSpace(s);
    }

    // Assuming `type` can be any string but you might want to limit it to specific values
    // If there are predefined types, you can replace the body with something like: return new List<string> { "type1", "type2" }.Contains(type);
    public static bool IsValidType(string? type)
    {
        return string.IsNullOrWhiteSpace(type) || movieTypes.Contains(type.ToLower());
    }

    // For `year`, assuming it's a 4 digit representation of a year
    public static bool IsValidYear(string? year)
    {
        if (string.IsNullOrWhiteSpace(year)) return true;

        return int.TryParse(year, out int parsedYear) && parsedYear > 1900 && parsedYear <= DateTime.Now.Year;
    }

    // Assuming `sort` can be any string but you might want to limit it to specific values
    // If there are predefined sorts, you can replace the body with something like: return new List<string> { "asc", "desc" }.Contains(sort);
    public static bool IsValidSort(string? sort)
    {
        return string.IsNullOrWhiteSpace(sort) || sortTypes.Contains(sort.ToLower());
    }

    // Assuming `pageNumber` should be 1 or more
    public static bool IsValidPageNumber(int pageNumber)
    {
        return pageNumber > 0;
    }

    // Assuming `pageSize` should be between 1 to 100 (or any other limits you might want to set)
    public static bool IsValidPageSize(int pageSize)
    {
        return pageSize > 0 && pageSize <= 100; // you can adjust the upper limit as per requirements
    }
}