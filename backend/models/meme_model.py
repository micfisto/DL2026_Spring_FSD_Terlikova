from sqlalchemy import Column, Integer, String
from backend.database.database import Base


class WeatherMeme(Base):
    __tablename__ = "memes"

    id = Column(Integer, primary_key=True, index=True)

    weather_category = Column(String)
    temp_category = Column(String)
    wind_category = Column(String)

    file_name = Column(String)
