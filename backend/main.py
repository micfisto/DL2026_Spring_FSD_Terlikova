from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from backend.api.weather import weather_router
from backend.api.geocode import geocode_router
from backend.database.database import engine
from backend.models.meme_model import Base
from backend.api.meme_upload import meme_upload_router
from backend.api.meme_management import meme_management_router
import os

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(weather_router, prefix="/api")
app.include_router(geocode_router, prefix="/api")
app.include_router(meme_upload_router, prefix="/api")
app.include_router(meme_management_router, prefix="/api")
os.makedirs("memes", exist_ok=True)
app.mount("/memes", StaticFiles(directory="memes"), name="memes")
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

@app.get("/")
def read_index():
    return FileResponse("frontend/index.html")
