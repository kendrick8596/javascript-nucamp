console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})

async function fetchWeather() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = "Dallas";
    const state = "Texas"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${state}&appid=${apiKey}&units=imperial`

    try {
        let response = await fetch(url);
        let data = await response.json();
        displayWeather(data);
        console.log(data);
    } catch (error) {
        console.error('There was an error!', error);
    }
}

fetchWeather();

function displayWeather(data) {
    const img = document.createElement('img');
    const iconCode = data.weather[0].icon;
    const temp = data.main.temp;
    const weatherDescription = data.weather[0].description
    img.src = `https://openweathermap.org/img/w/${iconCode}.png`;
    img.alt = "weather data";
    document.querySelector('#weather-icon').appendChild(img);
    document.querySelector('#weather-temp').textContent = Math.floor(temp) + "\u00B0";
    document.querySelector('#weather-description').textContent = weatherDescription;
}
