const API_BASE_URL = window.location.origin;

export async function getWeather(city) {
    if (!city)
        return Promise.resolve();

    try {
        const apiResponse = await fetch(`${API_BASE_URL}/api/weather/${city}`);
        const weatherData = await apiResponse.json();

        if (weatherData.error) {
            alert(weatherData.error);
            return Promise.resolve();
        }

        document.getElementById("weatherCity").innerText = weatherData.city;
        document.getElementById("weatherInfo").innerText =
            `${weatherData.temperature}°C | Ощущается как ${weatherData.feels_like}°C\n${weatherData.description} | Ветер ${weatherData.wind_speed} м/с`;
        
        const weatherIconElement = document.getElementById("weatherIcon");
        if (weatherData.icon) {
            weatherIconElement.src = `/frontend/icons/${weatherData.icon}.svg`;
            weatherIconElement.alt = weatherData.description;
        }

        const memeImageElement = document.getElementById("memeImage");
        if (weatherData.meme?.url) {
            memeImageElement.src = weatherData.meme.url;
        } else {
            memeImageElement.src = '/memes/default.jpg';
        }
        memeImageElement.classList.remove("hidden");

        console.log(weatherData);
        return Promise.resolve(weatherData);

    } catch (requestError) {
        console.error(requestError);
        alert("Ошибка получения погоды");
        return Promise.resolve();
    }
}

document.getElementById("showWeatherBtn").addEventListener("click", () => {
    const cityInput = document.getElementById("cityInput").value;
    getWeather(cityInput);
});