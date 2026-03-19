def get_weather_category(weather: str):

    weather = weather.lower()

    if weather == "clear":
        return "sun"
    elif weather == "clouds":
        return "cloudy"
    elif weather in ["rain", "drizzle"]:
        return "rain"
    elif weather == "thunderstorm":
        return "storm"
    elif weather == "snow":
        return "snow"
    elif weather in ["mist", "fog"]:
        return "fog"
    return "unknown"
