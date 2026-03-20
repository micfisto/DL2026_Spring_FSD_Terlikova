import { getWeather } from "./weather.js";

const showWeatherButton = document.getElementById("showWeatherBtn");
const backButton = document.getElementById("backBtn");
const downloadButton = document.getElementById("downloadButton");
const card = document.querySelector(".card");

showWeatherButton.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if (city) {
        getWeather(city);
    }
});

backButton.addEventListener("click", () => {
    card.classList.remove("show-weather");
});

document.getElementById("downloadButton").addEventListener("click", async () => {
    const memeImg = document.getElementById("memeImage");
    const weatherPanel = document.querySelector(".weather-panel");

    // Проверяем, загружено ли изображение
    if (!memeImg.src || memeImg.src === window.location.href) {
        alert("Пожалуйста, сначала загрузите погоду и мем!");
        return;
    }

    // Скрываем кнопки на время создания скриншота
    backButton.style.visibility = "hidden";
    downloadButton.style.visibility = "hidden";

    try {
        // Пробуем разные CDN для загрузки html2canvas
        const cdnUrls = [
            "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
            "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
            "https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js"
        ];

        let html2canvas = window.html2canvas;
        
        if (!html2canvas) {
            for (const url of cdnUrls) {
                try {
                    html2canvas = await loadScript(url);
                    if (html2canvas) break;
                } catch (e) {
                    console.warn("Не удалось загрузить с:", url);
                }
            }
        }

        if (!html2canvas) {
            throw new Error("Не удалось загрузить html2canvas ни с одного CDN");
        }

        // Используем html2canvas для захвата панели
        const canvas = await html2canvas(weatherPanel, {
            backgroundColor: "#ffffff",
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false
        });

        // Преобразуем в формат изображения для скачивания
        const dataUrl = canvas.toDataURL("image/png");

        // Создаём ссылку для скачивания
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "weather_meme.png";
        link.click();
    } catch (err) {
        console.error("Ошибка при создании изображения:", err);
        alert("Не удалось создать изображение: " + err.message);
    } finally {
        // Показываем кнопки обратно
        backButton.style.visibility = "visible";
        downloadButton.style.visibility = "visible";
    }
});

// Функция для загрузки скрипта
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(window.html2canvas);
        script.onerror = () => reject(new Error("Ошибка загрузки скрипта"));
        document.head.appendChild(script);
    });
}