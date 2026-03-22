function showNotification(message) {
    alert(message);
}

const geolocationBtn = document.querySelector('.geolocation-button');
if (geolocationBtn) {
    geolocationBtn.addEventListener('click', async () => {
        if (!navigator.geolocation) {
            showNotification("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (user_position) => {
            const latitude = user_position.coords.latitude;
            const longitude = user_position.coords.longitude;

            try {
                const api_response = await fetch(`/api/geocode?latitude=${latitude}&longitude=${longitude}`)
                const geocodeData = await api_response.json()

                if (geocodeData.error || !geocodeData.city) {
                    showNotification("City not found");
                    return;
                }

                document.getElementById("cityInput").value = geocodeData.city;

            } catch (location_error) {
                showNotification("Error detecting city");
                console.error(location_error);
            }
        }, (location_error) => {
            showNotification("Cannot get location: " + location_error.message);
        });
    });
}