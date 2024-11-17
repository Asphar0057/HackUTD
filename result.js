async function fetchWeather(city) {
  try {
    const response = await fetch(`http://localhost:3000/api/weather?city=${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if data has an error
    if (data.error) {
      console.error(`API Error: ${data.error.message}`);
      document.querySelector('.weather-card').textContent = `Failed to fetch weather data for ${city}. Please try again.`;
      return;
    }

    // Extract necessary data
    const { temp_c, condition, humidity, wind_kph } = data.current;
    const { name, localtime } = data.location;

    // Update the UI elements
    document.getElementById('temperature').textContent = `${temp_c}°C`;
    document.getElementById('city-name').textContent = name;
    document.getElementById('condition-text').textContent = condition.text;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${wind_kph} kph`;
    document.getElementById('datetime').textContent = `Local Time: ${localtime}`;

    // Update the weather icon based on the condition
    const weatherIcon = document.getElementById('weather-icon');
    const conditionTextLower = condition.text.toLowerCase();

    if (conditionTextLower.includes('cloud')) {
      weatherIcon.src = 'images/cloudy.png';
    } else if (conditionTextLower.includes('rain')) {
      weatherIcon.src = 'images/rain.png';
    } else if (conditionTextLower.includes('sunny') || conditionTextLower.includes('clear')) {
      weatherIcon.src = 'images/clear.png';
    } else if (conditionTextLower.includes('snow')) {
      weatherIcon.src = 'images/snow.png';
    } else if (conditionTextLower.includes('mist')) {
      weatherIcon.src = 'images/misty.png';
    } else {
      weatherIcon.src = 'images/default.png';
    }

    weatherIcon.alt = condition.text;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.querySelector('.weather-card').textContent = 'Failed to fetch weather data.';
  }
}

// Get the city name from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city');

if (city) {
  fetchWeather(city);
} else {
  document.querySelector('.weather-card').textContent = 'No city specified.';
}

// Push a new state to the history stack
window.history.pushState({ page: 'result' }, 'Result', window.location.href);

// Function to navigate back to the previous page
function goBack() {
  if (window.history.state && window.history.state.page === 'result') {
    window.history.back();
  } else {
    alert("No previous page found. Please navigate back manually.");
  }
}

// Handle the popstate event to detect when the user presses the browser back button
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page === 'result') {
    goBack();
  }
});


