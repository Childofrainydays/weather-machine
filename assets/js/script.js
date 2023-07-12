// References to the search bar and weather list container
const searchBar = document.querySelector('.search-bar');
const weatherList = document.querySelector('.weather-list');

// Code to hide the .weather-box container
// Grouped the code together for better readability instead of at the top with the others
const weatherBox = document.querySelector('.weather-box');
weatherBox.style.display = 'none'; // Hide the container initially

// TODO: API key for OpenWeatherMap
const api = 'API_URL_HERE';

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

        });

        fetch(api)
            .then(response => {
                return response.json();
            })
    }
});

// Function to fetch weather data using the API for a specific location
// Event listener for input in the search bar
searchBar.addEventListener('input', function() {
  const location = searchBar.value;
  
  // Fetch the weather data from the API for the searched location
  // TODO: EDIT THE URL BELOW WITH OWN API KEY
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(weatherData) {
      displayWeatherInfo(weatherData);
    })
    // Catch any errors as good practice
    .catch(function(error) {
      console.log('Error:', error.message);
    });    
});

// Function to display the weather data in the .weather-box container
function displayWeatherInfo(weatherData) {
  // Clear previous entries
  weatherList.innerHTML = '';

  // Access the weather data from the API by using properties
  const cityName = weatherData.name;
  const temperature = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;

  // Create HTML elements to display the weather data for each property
  const cityNameElement = document.createElement('h2');
  cityNameElement.textContent = cityName;

  const temperatureElement = document.createElement('h2');
  temperatureElement.textContent = `${temperature}°C`;

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