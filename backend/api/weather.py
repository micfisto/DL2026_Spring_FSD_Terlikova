from fastapi import APIRouter
from backend.services.weather_service import get_weather_with_meme

weather_router = APIRouter()

@weather_router.get("/weather/{city}")
def get_weather(city: str):
    return get_weather_with_meme(city)