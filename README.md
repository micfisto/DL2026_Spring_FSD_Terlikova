### WeatherMemeApp

Приложение для отображения погоды с мемами.

## Функционал

- Получение текущей погоды по названию города
- Отображение мемов в зависимости от погодных условий
- Загрузка и управление мемами
- Автодополнение названий городов
- Геолокация

## Технологии

### Backend
- **FastAPI** - веб-фреймворк
- **Uvicorn** - ASGI сервер для запуска FastAPI
- **SQLAlchemy** - ORM для работы с базой данных
- **SQLite** - база данных
- **Requests** - HTTP клиент для API погоды
- **python-dotenv** - загрузка переменных окружения из .env файлов
- **python-multipart** - поддержка загрузки файлов через multipart/form-data

### Frontend
- **HTML5/CSS3/JavaScript** - интерфейс
- **html2canvas** - создание скриншотов

## Установка и запуск

### Требования
- Python 3.10 или выше
- pip

### 1. Клонировать репозиторий

```bash
git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ>
cd WeatherMemeApp
```

### 2. Создать виртуальное окружение

```bash
python -m venv venv
```

### 3. Активировать виртуальное окружение

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 4. Установить зависимости

```bash
pip install -r requirements.txt
```

### 5. Создать файл .env

Создайте файл `backend/.env` и добавьте:

```
OPENWEATHER_API_KEY=ваш_ключ_api
```

Получить API ключ можно на: https://openweathermap.org/api

### 6. Запустить приложение

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Открыть в браузере: http://localhost:8000

## Структура проекта

```
WeatherMemeApp/
├── backend/
│   ├── api/           # API роуты
│   ├── clients/       # Клиенты внешних API
│   ├── database/      # Настройки БД
│   ├── models/        # Модели SQLAlchemy
│   ├── services/      # Бизнес-логика
│   ├── utils/         # Утилиты
│   └── main.py        # Точка входа
├── frontend/
│   ├── css/           # Стили
│   ├── icons/         # SVG иконки
│   ├── js/            # JavaScript
│   └── index.html     # Главная страница
├── memes/             # Загруженные мемы
├── requirements.txt   # Python зависимости
└── .gitignore         # Исключения Git
```

## Настройка Git репозитория

### Если удалили старый репозиторий:

```bash
# Удалить старую привязку
rm -rf .git

# Инициализировать новый
git init

# Добавить все файлы
git add .

# Создать коммит
git commit -m "Initial commit"

# Добавить удалённый репозиторий
git remote add origin <URL_ВАШЕГО_НОВОГО_РЕПОЗИТОРИЯ>

# Отправить
git push -u origin main
```

## Docker (опционально)

### Создать Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Запустить с Docker

```bash
# Собрать образ
docker build -t weathermemeapp .

# Запустить контейнер
docker run -p 8000:8000 -e OPENWEATHER_API_KEY=ваш_ключ weathermemeapp
```

## Примечания

- **Иконки** - SVG иконки загружаются на GitHub, они маленькие и необходимы для работы
- **База данных** - SQLite файлы (.db) не загружаются на GitHub (исключены в .gitignore)
- **Мемы** - загруженные мемы хранятся локально в папке `memes/` и не загружаются на GitHub (каждый пользователь загружает свои мемы)
