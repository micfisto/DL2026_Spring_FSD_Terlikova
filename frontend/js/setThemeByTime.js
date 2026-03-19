function getTimeOfDay() {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
        return "morning";
    } else if (hour >= 12 && hour < 18) {
        return "day";
    } else {
        return "night";
    }
}


function setThemeByTime() {
    const timeOfDay = getTimeOfDay();

    document.body.classList.remove("morning", "day", "night");
    document.body.classList.add(timeOfDay);
}
    document.addEventListener("DOMContentLoaded", () => {
    setThemeByTime();
});