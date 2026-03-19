import { getWeather } from './weather';
import { showNotification } from './notifications';

export async function detectUserCity() {
    if (!navigator.geolocation) {
        showNotification("Геопозиция не поддерживается браузером");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
            const response = await fetch(`/geocode?lat=${lat}&lon=${lon}`)
            const data = await response.json()

            if (data.error || !data.city) {
                showNotification("Город по вашей геопозиции не найден");
                return;
            }

            const city = data.city;
            document.getElementById("cityInput").value = city;

            // Получаем погоду сразу и сдвигаем панель
            getWeather(city);
        } catch (err) {
            showNotification("Ошибка при определении города");
            console.error(err);
        }
    }, (err) => {
        showNotification("Невозможно получить геопозицию: " + err.message);
    });
}

window.addEventListener("DOMContentLoaded", detectUserCity);