def get_weather_category(weather_condition: str):

    weather_condition = weather_condition.lower()

    if weather_condition == "clear":
        return "sunny"  # Соответствует frontend категории "sunny"
    elif weather_condition == "clouds":
        return "cloudy"
    elif weather_condition in ["rain", "drizzle"]:
        return "rainy"  # Соответствует frontend категории "rainy"
    elif weather_condition == "thunderstorm":
        return "stormy"  # Соответствует frontend категории "stormy"
    elif weather_condition == "snow":
        return "snowy"  # Соответствует frontend категории "snowy"
    elif weather_condition in ["mist", "fog"]:
        return "windy"  # Соответствует frontend категории "windy"
    return "sunny"
