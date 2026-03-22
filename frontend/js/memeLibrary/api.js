export async function loadAllMemes() {
    try {
        const response = await fetch('/api/memes');
        return response.ok ? await response.json() : [];
    } catch (error) {
        console.error('Ошибка загрузки мемов:', error);
        return [];
    }
}

export async function deleteMeme(memeId) {
    try {
        const response = await fetch(`/api/memes/${memeId}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Мем удалён!');
            return true;
        } else {
            alert('Ошибка при удалении мема');
            return false;
        }
    } catch (error) {
        console.error('Ошибка удаления:', error);
        alert('Ошибка при удалении мема');
        return false;
    }
}

export async function saveMemeChanges(memeId, categories) {
    try {
        const response = await fetch(`/api/memes/${memeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                weather_category: categories.weather.join(','),
                temp_category: categories.temp.join(','),
                season_category: categories.season.join(',')
            })
        });

        if (response.ok) {
            alert('Изменения сохранены!');
            return true;
        } else {
            alert('Ошибка при сохранении');
            return false;
        }
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        alert('Ошибка при сохранении');
        return false;
    }
}

export async function uploadMeme(file, categories) {
    const formData = new FormData();
    formData.append('upload_file', file);
    formData.append('weather_category', categories.weather.join(','));
    formData.append('temp_category', categories.temp.join(','));
    formData.append('season_category', categories.season.join(','));

    try {
        const response = await fetch('/api/upload_meme', { method: 'POST', body: formData });
        if (response.ok) {
            alert('Мем успешно загружен!');
            return true;
        } else {
            alert('Ошибка при загрузке мема');
            return false;
        }
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        alert('Ошибка при загрузке мема');
        return false;
    }
}
