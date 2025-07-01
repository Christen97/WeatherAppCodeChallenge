using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace WeatherApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
  private readonly IMemoryCache _cache;
  private readonly HttpClient _http;
  private readonly Dictionary<string, string?> _nearbyAirports = new()
  {
    { "EKHG", "EKKA" },
    { "EKGE", null },
    { "EKST", "EKOD" },
    { "EKVH", "EKYT" }
  };

  public WeatherController(IMemoryCache cache)
  {
    _cache = cache;
    _http = new HttpClient();
    _http.DefaultRequestHeaders.Add("x-foreflight-odense", "true");  }

  [HttpGet("{icao}")]
  public async Task<IActionResult> GetWeather(string icao)
  {
    icao = icao.ToUpperInvariant();

    if (_nearbyAirports.ContainsKey(icao) && _nearbyAirports[icao] == null)
      return NotFound("No weather available for this airport or nearby.");

    var finalIcao = _nearbyAirports.ContainsKey(icao) ? _nearbyAirports[icao] ?? icao : icao;

    string cacheKey = $"metar:{finalIcao}";
    if (_cache.TryGetValue(cacheKey, out string cachedResult))
    {
      var cachedJson = JsonSerializer.Deserialize<object>(cachedResult);
      return Ok(new { source = "cache", icao = finalIcao, data = cachedJson });
    }

    await Task.Delay(2000);

    try
    {
      string url = $"https://api.foreflight.com/weather/report/{finalIcao}";
      var result = await _http.GetStringAsync(url);

      var json = JsonSerializer.Deserialize<object>(result);

      _cache.Set(cacheKey, result, TimeSpan.FromMinutes(5));
      return Ok(new { source = "api", icao = finalIcao, data = json });
    }
    catch (Exception ex)
    {
      Console.WriteLine($"Error fetching METAR: {ex.Message}");
      return StatusCode(502, "Failed to fetch weather data.");
    }
  }
}
