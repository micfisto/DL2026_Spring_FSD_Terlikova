from backend.clients.weather_api import get_weather_from_api
from backend.utils.temperature_mapper import get_temperature_category
from backend.utils.wind_mapper import get_wind_speed_mapper
from backend.utils.weather_mapper import get_weather_category
from backend.services.meme_service import get_meme


def get_weather_with_meme(city: str):
    try:
        data = get_weather_from_api(city)

        temperature_actual = data["main"]["temp"]
        temperature_feels = data["main"]["feels_like"]
        weather = data["weather"][0]["main"]
        wind_speed = data["wind"]["speed"]

        temp_actual_display = round(temperature_actual)
        feels_like_display = round(temperature_feels)

        if abs(temperature_actual - temperature_feels) > 2:
            temp_for_meme = temperature_feels
        else:
            temp_for_meme = temperature_actual

        temp_category = get_temperature_category(round(temp_for_meme))
        weather_category = get_weather_category(weather)
        wind_category = get_wind_speed_mapper(wind_speed)

        meme = get_meme(temp_category, weather_category, wind_category)

        description = f"{weather}"

        return {
            "city": city,
            "temperature": temp_actual_display,
            "feels_like": feels_like_display,
            "description": description,
            "icon": weather_category,
            "wind_speed": wind_speed,
            "meme": meme
        }

    except Exception as e:
        print("ERROR in get_weather_with_meme:", e)
        return {"error": str(e)}