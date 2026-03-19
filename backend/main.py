from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from backend.api.weather import router as weather_router
from backend.database.database import engine
from backend.models.meme_model import Base
from backend.api.meme_upload import router as meme_router
import os

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(weather_router)
app.include_router(meme_router)
os.makedirs("memes", exist_ok=True)
app.mount("/memes", StaticFiles(directory="memes"), name="memes")
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

@app.get("/")
def read_index():
    return FileResponse("frontend/index.html")
