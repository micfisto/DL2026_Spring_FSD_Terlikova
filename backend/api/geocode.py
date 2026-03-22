from fastapi import APIRouter, Query
import requests
import os

geocode_router = APIRouter()
API_KEY = os.getenv("OPENWEATHER_API_KEY")


@geocode_router.get("/geocode")
def geocode(latitude: float = Query(...), longitude: float = Query(...)):
    url = f"http://api.openweathermap.org/geo/1.0/reverse?lat={latitude}&lon={longitude}&limit=1&appid={API_KEY}"
    
    try:
        api_response = requests.get(url, timeout=10)
        geocode_data = api_response.json()
    except requests.exceptions.RequestException as request_error:
        return {"error": f"Geocoding error: {str(request_error)}"}

    if not geocode_data or not isinstance(geocode_data, list):
        return {"error": "City not found"}

    return {"city": geocode_data[0]["name"]}


@geocode_router.get("/geocode/search")
def search_cities(query: str = Query(...), limit: int = Query(5)):
    if not query or len(query) < 2:
        return {"cities": []}
    
    url = f"http://api.openweathermap.org/geo/1.0/direct?q={query}&limit={limit}&appid={API_KEY}"
    
    try:
        api_response = requests.get(url, timeout=10)
        geocode_data = api_response.json()
    except requests.exceptions.RequestException as request_error:
        return {"error": f"Geocoding error: {str(request_error)}", "cities": []}

    if not geocode_data or not isinstance(geocode_data, list):
        return {"cities": []}

    cities = []
    for city_data in geocode_data:
        city_name = city_data.get("name", "")
        country = city_data.get("country", "")
        state = city_data.get("state", "")
        
        if state:
            display_name = f"{city_name}, {state}, {country}"
        else:
            display_name = f"{city_name}, {country}"
        
        cities.append({
            "name": city_name,
            "display": display_name,
            "latitude": city_data.get("lat"),
            "longitude": city_data.get("lon")
        })

    return {"cities": cities}
