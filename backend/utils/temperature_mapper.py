def get_temperature_category(temperature: float):
    if temperature <= -20:
        return "very_cold"
    elif -20 < temperature < -5:
        return "cold"
    elif -5 <= temperature < 15:
        return "cool"
    elif 15 <= temperature < 25:
        return "warm"
    elif 25 <= temperature < 35:
        return "hot"
    elif temperature >= 35:
        return "very_hot"
    else:
        return "unknown"
