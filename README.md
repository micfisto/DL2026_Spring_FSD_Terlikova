# WeatherMemeApp

An application that displays weather information with contextual memes based on current weather conditions.

## Features

- Get current weather by city name
- Display memes based on weather conditions
- Upload and manage memes
- City name autocomplete
- Geolocation support

## Technology Stack

### Backend
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server for running FastAPI
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Database
- **Requests** - HTTP client for weather API
- **python-dotenv** - Load environment variables from .env files
- **python-multipart** - Support for file uploads via multipart/form-data

### Frontend
- **HTML5/CSS3/JavaScript** - User interface
- **html2canvas** - Screenshot generation

## Installation and Setup

### Requirements
- Python 3.10 or higher
- pip

### 1. Clone the repository

```bash
git clone <https://github.com/micfisto/DL2026_Spring_FSD_Terlikova>
cd WeatherMemeApp
```

### 2. Create virtual environment

```bash
python -m venv venv
```

### 3. Activate virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Create .env file

Create a `backend/.env` file and add:

```
OPENWEATHER_API_KEY=your_api_key
```

Get API key at: https://openweathermap.org/api

### 6. Run the application

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Open in browser: http://localhost:8000

## API Endpoints

### Weather

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather/{city}` | Get weather data and meme for a city |

**Response:**
```json
{
  "weather": {
    "temperature": 20,
    "description": "sunny",
    "wind_speed": 5,
    "humidity": 60
  },
  "meme": {
    "id": 1,
    "file_name": "sunny_meme.jpg",
    "url": "/memes/sunny_meme.jpg"
  }
}
```

### Geocoding

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/geocode?latitude=&longitude=` | Reverse geocoding - get city name from coordinates |
| GET | `/api/geocode/search?query=&limit=` | Search cities by name |

**Response (reverse geocoding):**
```json
{
  "city": "Moscow"
}
```

**Response (search):**
```json
{
  "cities": [
    {
      "name": "Moscow",
      "display": "Moscow, Russia",
      "latitude": 55.75,
      "longitude": 37.61
    }
  ]
}
```

### Meme Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/memes` | Get all memes |
| POST | `/api/upload_meme` | Upload a new meme |
| PUT | `/api/memes/{meme_id}` | Update meme categories |
| DELETE | `/api/memes/{meme_id}` | Delete a meme |

**GET /api/memes Response:**
```json
[
  {
    "id": 1,
    "file_name": "sunny.jpg",
    "url": "/memes/sunny.jpg",
    "weather_category": "sunny",
    "temp_category": "warm",
    "wind_category": "calm",
    "season_category": "summer",
    "created_at": 1699999999.0
  }
]
```

**POST /api/upload_meme** (multipart/form-data):
- `upload_file`: Image file
- `weather_category`: Weather condition (sunny, rainy, cloudy, snowy, stormy, windy)
- `temp_category`: Temperature category (cold, warm, hot)
- `season_category`: Season (spring, summer, autumn, winter)

**PUT /api/memes/{meme_id}** (JSON):
```json
{
  "weather_category": "rainy",
  "temp_category": "cold",
  "season_category": "autumn"
}
```

## Project Structure

```
WeatherMemeApp/
├── backend/
│   ├── api/           # API routes
│   ├── clients/       # External API clients
│   ├── database/      # Database settings
│   ├── models/        # SQLAlchemy models
│   ├── services/      # Business logic
│   ├── utils/         # Utilities
│   └── main.py        # Entry point
├── frontend/
│   ├── css/           # Styles
│   ├── icons/         # SVG icons
│   ├── js/            # JavaScript
│   └── index.html     # Main page
├── memes/             # Uploaded memes
├── requirements.txt   # Python dependencies
└── .gitignore         # Git exclusions
```

## Git Repository Setup

### If you deleted the old repository:

```bash
# Remove old binding
rm -rf .git

# Initialize new one
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit"

# Add remote repository
git remote add origin <YOUR_NEW_REPO_URL>

# Push
git push -u origin main
```

## Docker (Optional)

### Create Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Run with Docker

```bash
# Build image
docker build -t weathermemeapp .

# Run container
docker run -p 8000:8000 -e OPENWEATHER_API_KEY=your_key weathermemeapp
```

## Notes

- **Icons** - SVG icons are loaded on GitHub, they are small and required for operation
- **Database** - SQLite files (.db) are not uploaded to GitHub (excluded in .gitignore)
- **Memes** - Uploaded memes are stored locally in the `memes/` folder and not uploaded to GitHub (each user uploads their own memes)
