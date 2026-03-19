import {getWeather} from "./weather.js";

const showWeatherButton = document.getElementById("showWeatherBtn");
const backBotton = document.getElementById("backBtn");
const card = document.querySelector(".card");

showWeatherButton.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if (city) {
        getWeather(city);
    }
});

backBotton.addEventListener("click", () => {
    card.classList.remove("show-weather");
});