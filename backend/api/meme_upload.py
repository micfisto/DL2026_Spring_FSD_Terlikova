from fastapi import APIRouter, UploadFile, File, Form
import shutil
import os

from backend.database.database import SessionLocal
from backend.models.meme_model import WeatherMeme

meme_upload_router = APIRouter()

UPLOAD_FOLDER = "memes"


@meme_upload_router.post("/upload_meme")
async def upload_meme(
        upload_file: UploadFile = File(...),
        weather_category: str = Form(""),
        temp_category: str = Form(""),
        season_category: str = Form("")
):
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    file_path = f"{UPLOAD_FOLDER}/{upload_file.filename}"

    with open(file_path, "wb") as output_file:
        shutil.copyfileobj(upload_file.file, output_file)

    database_session = SessionLocal()

    weather_meme = WeatherMeme(
        weather_category=weather_category,
        temp_category=temp_category,
        season_category=season_category,
        file_name=upload_file.filename
    )

    database_session.add(weather_meme)
    database_session.commit()
    database_session.refresh(weather_meme)

    return {"status": "uploaded", "file": upload_file.filename, "id": weather_meme.id}
