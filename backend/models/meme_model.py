from sqlalchemy import Column, Integer, String, DateTime
from backend.database.database import Base
from datetime import datetime


class WeatherMeme(Base):
    __tablename__ = "memes"

    id = Column(Integer, primary_key=True, index=True)

    weather_category = Column(String)
    temp_category = Column(String)
    wind_category = Column(String)
    season_category = Column(String)
    
    created_at = Column(DateTime, default=datetime.utcnow)

    file_name = Column(String)
