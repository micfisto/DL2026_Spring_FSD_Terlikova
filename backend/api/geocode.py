from fastapi import APIRouter, Query
import requests
import os

router = APIRouter()
API_KEY = os.getenv("OPENWEATHER_API_KEY")


@router.get("/geocode")
def geocode(lat: float = Query(...), lon: float = Query(...)):
    url = f"http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit=1&appid={API_KEY}"
    resp = requests.get(url)
    data = resp.json()

    if not data:
        return {"error": "Город не найден"}

    return {"city": data[0]["name"]}
