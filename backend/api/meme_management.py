from fastapi import APIRouter, HTTPException
import os

from backend.database.database import SessionLocal
from backend.models.meme_model import WeatherMeme

meme_management_router = APIRouter()


@meme_management_router.get("/memes")
async def get_all_memes():
    database_session = SessionLocal()
    try:
        weather_memes = database_session.query(WeatherMeme).all()
        return [
            {
                "id": weather_meme.id,
                "file_name": weather_meme.file_name,
                "url": f"/memes/{weather_meme.file_name}",
                "weather_category": weather_meme.weather_category,
                "temp_category": weather_meme.temp_category,
                "wind_category": weather_meme.wind_category,
                "season_category": weather_meme.season_category,
                "created_at": weather_meme.created_at.timestamp() if weather_meme.created_at else None
            }
            for weather_meme in weather_memes
        ]
    finally:
        database_session.close()


@meme_management_router.delete("/memes/{meme_id}")
async def delete_meme(meme_id: int):
    database_session = SessionLocal()
    try:
        weather_meme = database_session.query(WeatherMeme).filter(WeatherMeme.id == meme_id).first()
        if not weather_meme:
            raise HTTPException(status_code=404, detail="Мем не найден")
        
        file_path = f"memes/{weather_meme.file_name}"
        if os.path.exists(file_path):
            os.remove(file_path)
        
        database_session.delete(weather_meme)
        database_session.commit()
        
        return {"status": "deleted", "id": meme_id}
    finally:
        database_session.close()


@meme_management_router.put("/memes/{meme_id}")
async def update_meme(meme_id: int, update_data: dict):
    database_session = SessionLocal()
    try:
        weather_meme = database_session.query(WeatherMeme).filter(WeatherMeme.id == meme_id).first()
        if not weather_meme:
            raise HTTPException(status_code=404, detail="Мем не найден")
        
        if "weather_category" in update_data:
            weather_meme.weather_category = update_data["weather_category"]
        if "temp_category" in update_data:
            weather_meme.temp_category = update_data["temp_category"]
        if "season_category" in update_data:
            weather_meme.season_category = update_data["season_category"]
        
        database_session.commit()
        database_session.refresh(weather_meme)
        
        return {
            "status": "updated",
            "id": meme_id,
            "weather_category": weather_meme.weather_category,
            "temp_category": weather_meme.temp_category,
            "season_category": weather_meme.season_category
        }
    finally:
        database_session.close()
