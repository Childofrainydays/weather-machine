// References to the search bar and weather list container
const searchBar = document.querySelector('.search-bar');
const weatherList = document.querySelector('.weather-list');

// Code to hide the .weather-box container
const weatherBox = document.querySelector('.weather-box');
weatherBox.style.display = 'none'; // Hide the container initially

// API key for OpenWeatherMap
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

// Function to get the weather data from the API
searchBar.addEventListener('input', () => {
    const location = searchBar.value;
  
    // Fetch the weather data from the API
    // EDIT THE URL BELOW WITH OWN API KEY
    const api = 'API_URL_HERE';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`)
    .then(response => {
        return response.json();
    })
    .then(weatherData => {
        const parsedWeatherData = JSON.parse(weatherData);

        // Do something with the parsed weather data.
    })
    .catch(error => {
        // Handle any errors that occur during the fetch request
        console.log('Error:', error.message);
    });    
  });