import { getWeather } from "./weather.js";
import { slideToWeather } from "./panelSlide.js";

const showWeatherButton = document.getElementById("showWeatherBtn");
const backButton = document.getElementById("backBtn");
const downloadButton = document.getElementById("downloadButton");
const mainCard = document.querySelector(".card");

showWeatherButton.addEventListener("click", () => {
    const cityInput = document.getElementById("cityInput").value;
    if (cityInput) {
        getWeather(cityInput).then(() => slideToWeather());
    }
});

backButton.addEventListener("click", () => {
    mainCard.classList.remove("show-weather");
});

document.getElementById("downloadButton").addEventListener("click", async () => {
    const memeImageElement = document.getElementById("memeImage");
    const weatherPanelElement = document.querySelector(".weather-panel");

    if (!memeImageElement.src || memeImageElement.src === window.location.href) {
        alert("Пожалуйста, сначала загрузите погоду и мем!");
        return;
    }

    backButton.style.visibility = "hidden";
    downloadButton.style.visibility = "hidden";

    try {
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

        const screenshotCanvas = await html2canvas(weatherPanelElement, {
            backgroundColor: "#ffffff",
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false
        });

        const dataUrl = screenshotCanvas.toDataURL("image/png");

        const downloadLink = document.createElement("a");
        downloadLink.href = dataUrl;
        downloadLink.download = "weather_meme.png";
        downloadLink.click();
    } catch (loadError) {
        console.error("Ошибка при создании изображения:", loadError);
        alert("Не удалось создать изображение: " + loadError.message);
    } finally {
        backButton.style.visibility = "visible";
        downloadButton.style.visibility = "visible";
    }
});

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const canvasScriptElement = document.createElement("script");
        canvasScriptElement.src = src;
        canvasScriptElement.onload = () => resolve(window.html2canvas);
        canvasScriptElement.onerror = () => reject(new Error("Ошибка загрузки скрипта"));
        document.head.appendChild(canvasScriptElement);
    });
}