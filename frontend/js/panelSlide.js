const backButton = document.getElementById("backBtn");
const mainCard = document.querySelector(".card");

backButton.addEventListener("click", () => {
    mainCard.classList.remove("show-weather");
});

export function slideToWeather() {
    mainCard.classList.add("show-weather");
}