// References to the search bar and weather list container
const searchBar = document.querySelector('.search-bar');
const weatherList = document.querySelector('.weather-list');

// Code to hide the .weather-box container
// Grouped the code together for better readability instead of at the top with the others
const weatherBox = document.querySelector('.weather-box');

// API key for OpenWeatherMap
const api = 'c3eb4de02f0bb80f164a363c8fa84c0e';

// Variable to keep track of the current unit of measurement for the temperature
let currentUnit = "celsius";

// Neat trick to get the current location of the user for weather data on load learned from Developedbyed on YouTube
window.addEventListener('load', () => {
    
  let long;
  let lat;

  // Check if the browser supports geolocation
  if (navigator.geolocation) {
      // Get the current position of the user
      navigator.geolocation.getCurrentPosition(position => {
          long = position.coords.longitude;
          lat = position.coords.latitude;

          // Fetch the weather data from the API for the user's LONG and LAT
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`)
              .then(response => {
                  return response.json();
              })
              .then(weatherData => {
                  displayWeatherInfo(weatherData);
              })
              .catch(error => {
                  console.log('Error:', error.message);
              });
      });
  }
});

// Function to fetch weather data using the API 
function fetchWeatherData(location) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api}`)
    .then((response) => response.json())
    .then((forecastData) => {
      displayForecastInfo(forecastData);
    })
    .catch((error) => {
      console.log('Error:', error.message);
    });
}

// Function to display the weather data in the .weather-box container
function displayForecastInfo(forecastData) {
  // Clear previous entries
  weatherList.innerHTML = '';

  // Access the forecast data from the API by using properties
  const forecastList = forecastData.list;

  // Create a loop to iterate through the forecast data for each day
  for (let i = 0; i < forecastList.length; i += 8) { // Fetch data for every 24 hours (8 data points per day)
    const forecastDate = new Date(forecastList[i].dt * 1000);
    const temperatureKelvin = forecastList[i].main.temp; // Temperature in Kelvin

    // Convert temperature OUT of Kelvin
    const temperatureCelsius = temperatureKelvin - 273.15;
    const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;

    const weatherDescription = forecastList[i].weather[0].description;
    const humidity = forecastList[i].main.humidity;
    const windSpeed = forecastList[i].wind.speed;

    // Create HTML elements to display the weather data for each property
    const forecastDateElement = document.createElement('h2');
    forecastDateElement.textContent = forecastDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
  const temperatureElement = document.createElement('h2');
  temperatureElement.textContent = `${temperatureCelsius.toFixed(1)}°C`; // Display temperature in Celsius with one decimal place

  // Add click event listeners to the degree buttons to toggle between Celsius and Fahrenheit
  const unitButtons = document.querySelectorAll('.unit-btn');
  // For each button, add a click event listener
  unitButtons.forEach(button => {
    button.addEventListener('click', function() {
      const unit = button.dataset.unit;
      // if the unit is different than the current unit, update the temperature and unit
      if (unit !== currentUnit) {
        currentUnit = unit;
        temperatureElement.textContent = `${getTemperature(unit === "celsius" ? temperatureCelsius : temperatureFahrenheit)}${getUnitSymbol(unit)}`;
        // Update the active class for the buttons to highlight the selected unit
        unitButtons.forEach(btn => btn.classList.toggle('active', btn === button));
      }
    });
  });

    // Create elements for the weather description, humidity, and wind speed
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Weather: ${weatherDescription}`;

    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${humidity}%`;

    const windSpeedElement = document.createElement('p');
    windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;

    // Append the elements to the .weather-list container
    weatherBox.appendChild(forecastDateElement);
    weatherBox.appendChild(temperatureElement);
    weatherBox.appendChild(descriptionElement);
    weatherBox.appendChild(humidityElement);
    weatherBox.appendChild(windSpeedElement);
  }
}

// Display the .weather-box container
weatherBox.style.display = 'block';

// Event listener for input in the search bar
searchBar.addEventListener('input', function () {
  const location = searchBar.value;
  fetchWeatherData(location);
});
