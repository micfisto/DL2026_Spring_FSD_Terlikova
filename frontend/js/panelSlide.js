import {getWeather} from "./weather.js";

const showWeatherBtn = document.getElementById("showWeatherBtn");
const backBtn = document.getElementById("backBtn");
const card = document.querySelector(".card");

showWeatherBtn.addEventListener("click", () => {
    card.classList.add("show-weather");

    const city = document.getElementById("cityInput").value;
    if (city) {
        getWeather(city);
        card.classList.add("show-weather");
    }
});

backBtn.addEventListener("click", () => {
    card.classList.remove("show-weather");
});