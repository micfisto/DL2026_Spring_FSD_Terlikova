import requests
import os
from pathlib import Path
from dotenv import load_dotenv
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

env_path = Path(__file__).resolve().parent.parent/".env"
load_dotenv(dotenv_path=env_path)

API_KEY = os.getenv("OPENWEATHER_API_KEY")


def get_weather_from_api(city: str):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    
    http_session = requests.Session()
    retry_strategy = Retry(
        total=3,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
    )
    retry_adapter = HTTPAdapter(max_retries=retry_strategy)
    http_session.mount("https://", retry_adapter)
    
    api_response = http_session.get(url, timeout=(10, 30))
    weather_data = api_response.json()

    if api_response.status_code != 200:
        raise Exception(weather_data.get("message", "Ошибка API"))

    return weather_data
