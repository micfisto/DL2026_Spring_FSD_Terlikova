import random

from backend.database.database import SessionLocal
from backend.models.meme_model import WeatherMeme


def get_meme(temp_category: str, weather_category: str, wind_category: str):
    db = SessionLocal()

    memes = db.query(WeatherMeme).filter(
        WeatherMeme.temp_category == temp_category,
        WeatherMeme.weather_category == weather_category,
        WeatherMeme.wind_category == wind_category
    ).all()

    if not memes:
        return {"url": "/memes/default.jpg"}

    meme = random.choice(memes)

    return {"url": f"/memes/{meme.file_name}"}
