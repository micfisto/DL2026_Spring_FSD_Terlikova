const API_BASE = window.location.origin;

export async function getWeather(city) {
    if (!city)
        return;

    try {
        const response = await fetch(`${API_BASE}/weather/${city}`);
        const data = await response.json();

        document.getElementById("weatherCity").innerText = data.city;
        document.getElementById("weatherInfo").innerText =
            `${data.temperature}°C | Ощущается как ${data.feels_like}°C\n${data.description} | Ветер ${data.wind_speed} м/с`;

        const memeImg = document.getElementById("memeImage");
        if (data.meme?.url) {
            memeImg.src = data.meme.url;
        } else {
            memeImg.src = '/memes/default.jpg';
        }
        memeImg.classList.remove("hidden");

        const card = document.querySelector(".card");
        card.classList.add("show-weather");
        console.log(data);

    } catch (err) {
        console.error(err);
        alert("Ошибка получения погоды");
    }
}

document.getElementById("showWeatherBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    getWeather(city);
});