import random

from backend.database.database import SessionLocal
from backend.models.meme_model import WeatherMeme


def check_category_match(meme_category: str, required_category: str) -> bool:

    if not required_category or required_category == "":
        return True
    
    if not meme_category:
        return False
    
    meme_categories = [category.strip() for category in meme_category.split(',')]
    required_categories = [category.strip() for category in required_category.split(',')]
    
    return any(required_category_item in meme_categories for required_category_item in required_categories)


def calculate_match_score(weather_meme, temp_category: str, weather_category: str, wind_category: str) -> int:
    score = 0
    if check_category_match(weather_meme.temp_category, temp_category):
        score += 1
    if check_category_match(weather_meme.weather_category, weather_category):
        score += 1
    if check_category_match(weather_meme.wind_category, wind_category):
        score += 1
    return score


def get_meme(temp_category: str, weather_category: str, wind_category: str):
    database_session = SessionLocal()
    try:
        all_memes = database_session.query(WeatherMeme).all()
        
        if not all_memes:
            return {"url": "/memes/photo_2026-03-21_14-44-28.jpg"}
        
        memes_with_score = []
        for weather_meme in all_memes:
            score = calculate_match_score(weather_meme, temp_category, weather_category, wind_category)
            memes_with_score.append((weather_meme, score))
        
        memes_with_score.sort(key=lambda x: x[1], reverse=True)
        
        best_score = memes_with_score[0][1] if memes_with_score else 0
        
        if best_score == 0:
            weather_meme = random.choice(all_memes)
        else:
            best_memes = [m for m, s in memes_with_score if s == best_score]
            weather_meme = random.choice(best_memes)

        return {"url": f"/memes/{weather_meme.file_name}"}
    finally:
        database_session.close()