// Neat trick to get the current location of the user for weather data learned from Developedbyed on YouTube
window.addEventListener('load', () => {
    
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        });
    }
});

// References to the search bar and weather list container
const searchBar = document.querySelector('.search-bar');
const weatherList = document.querySelector('.weather-list');
