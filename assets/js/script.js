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

    if (navigator.geolocation) {
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
