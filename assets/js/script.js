// References to the search bar and weather list container
const searchBar = document.querySelector('.search-bar');
const weatherList = document.querySelector('.weather-list');

// Code to hide the .weather-box container
// Grouped the code together for better readability instead of at the top with the others
const weatherBox = document.querySelector('.weather-box');
weatherBox.style.display = 'none'; // Hide the container initially

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
function displayWeatherInfo(weatherData) {
  // Clear previous entries
  weatherList.innerHTML = '';

  // Access the weather data from the API by using properties
  const cityName = weatherData.name;
  const temperatureKelvin = weatherData.main.temp; // Temperature in Kelvin

  // Convert temperature OUT of Kelvin so Salt Lake isn't listed as 303 degrees
  // Shoutout to Todd for the catch 
  const temperatureCelsius = temperatureKelvin - 273.15;
  // Code to convert temperature to Fahrenheit 
  const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;

  const weatherDescription = weatherData.weather[0].description;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;

  // Create HTML elements to display the weather data for each property
  const cityNameElement = document.createElement('h2');
  cityNameElement.textContent = cityName;

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
  weatherList.appendChild(cityNameElement);
  weatherList.appendChild(temperatureElement);
  weatherList.appendChild(descriptionElement);
  weatherList.appendChild(humidityElement);
  weatherList.appendChild(windSpeedElement);

  // Display the .weather-box container
  weatherBox.style.display = 'block';
}

// Event listener for input in the search bar
searchBar.addEventListener('input', function () {
  const location = searchBar.value;
  fetchWeatherData(location);
});
