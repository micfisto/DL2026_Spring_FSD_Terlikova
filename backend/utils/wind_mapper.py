def get_wind_speed_category(wind_speed: float):
    if wind_speed < 5:
        return "calm"
    elif wind_speed < 15:
        return "windy"
    else:
        return "storm"
