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
// He used an arrow function for this code
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
// TODO: Define the displayWeatherInfo function with a weatherData parameter
// TODO: Access the required weather data from the weatherData object
// TODO: Append the weather information elements to the weather list container