from fastapi import APIRouter, UploadFile, File
import shutil
import os

from backend.database.database import SessionLocal
from backend.models.meme_model import WeatherMeme

router = APIRouter()

UPLOAD_FOLDER = "memes"


@router.post("/upload_meme")
async def upload_meme(
        file: UploadFile = File(...),
        weather_category: str = "",
        temp_category: str = ""
):
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    db = SessionLocal()

    meme = WeatherMeme(
        weather_category=weather_category,
        temp_category=temp_category,
        file_name=file.filename
    )

    db.add(meme)
    db.commit()
    db.refresh(meme)

    return {"status": "uploaded", "file": file.filename}
