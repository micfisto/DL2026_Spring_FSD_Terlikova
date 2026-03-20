import {getWeather} from "./weather.js";

const showWeatherBtn = document.getElementById("showWeatherBtn");
const backButton = document.getElementById("backButton");
const card = document.querySelector(".card");

showWeatherBtn.addEventListener("click", () => {
    card.classList.add("show-weather");

    const city = document.getElementById("cityInput").value;
    if (city) {
        getWeather(city);
    }
});

backButton.addEventListener("click", () => {
    card.classList.remove("show-weather");
});