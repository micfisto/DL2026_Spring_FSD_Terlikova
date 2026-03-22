function getTimeOfDay() {
    const current_hour = new Date().getHours();

    if (current_hour >= 6 && current_hour < 11) {
        return "morning";
    } else if (current_hour >= 11 && current_hour < 16) {
        return "day";
    } else if (current_hour >= 16 && current_hour < 21) {
        return "evening";
    } else {
        return "night";
    }
}


function setThemeByTime() {
    const timeOfDay = getTimeOfDay();

    document.body.classList.remove("morning", "day", "evening", "night");
    document.body.classList.add(timeOfDay);
}

document.addEventListener("DOMContentLoaded", () => {
    setThemeByTime();
});