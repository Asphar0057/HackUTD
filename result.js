async function fetchWeather(city) {
    try {
      const response = await fetch(`http://localhost:3000/api/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();
  
      // Display weather information
      const weatherResult = document.getElementById('weather-result');
      if (data.error) {
        weatherResult.textContent = `Failed to fetch weather data for ${city}. Please try another city.`;
        return;
      }
  
      const { temp_c, condition } = data.current;
      weatherResult.textContent = `Weather in ${city}: ${temp_c}°C, ${condition.text}`;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      document.getElementById('weather-result').textContent = 'Failed to fetch weather data.';
    }
  }
  
  // Get the city name from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get('city');
  
  if (city) {
    fetchWeather(city);
  } else {
    document.getElementById('weather-result').textContent = 'No city specified.';
  }
  
  