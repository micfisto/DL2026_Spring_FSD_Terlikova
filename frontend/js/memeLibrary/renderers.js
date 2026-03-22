import { formatCategories } from './utils.js';
import { WEATHER_CATEGORIES, TEMP_CATEGORIES, SEASON_CATEGORIES, WEATHER_LABELS, TEMP_LABELS, SEASON_LABELS } from './constants.js';

export function renderMemeGallery(galleryElement, memes, onSelect = null) {
    if (!memes || memes.length === 0) {
        galleryElement.innerHTML = '<p class="meme-empty">Нет мемов</p>';
        return;
    }
    
    galleryElement.innerHTML = memes.map(meme => `
        <div class="meme-item" data-id="${meme.id}">
            <img src="${meme.url || '/memes/' + meme.file_name}" alt="${meme.file_name}">
            <div class="meme-item-info">
                <span class="meme-name">${meme.file_name}</span>
                <span class="meme-cats">${formatCategories(meme)}</span>
            </div>
            ${onSelect ? `<div class="meme-item-actions">
                <button class="meme-item-button select-meme" data-id="${meme.id}">Выбрать</button>
            </div>` : ''}
        </div>
    `).join('');
    
    if (onSelect) {
        galleryElement.querySelectorAll('.select-meme').forEach(btn => {
            btn.addEventListener('click', (e) => onSelect(parseInt(e.target.dataset.id)));
        });
    }
}

export function renderMemeTable(tableBodyElement, memes, onAction) {
    if (!memes || memes.length === 0) {
        tableBodyElement.innerHTML = '<tr><td colspan="4" class="meme-empty">Нет мемов</td></tr>';
        return;
    }
    
    tableBodyElement.innerHTML = memes.map(meme => `
        <tr>
            <td><img src="${meme.url || '/memes/' + meme.file_name}" alt="${meme.file_name}" class="meme-preview"></td>
            <td>${meme.file_name}</td>
            <td>${formatCategories(meme)}</td>
            <td><button class="meme-action-button" data-id="${meme.id}">${onAction}</button></td>
        </tr>
    `).join('');
    
    return tableBodyElement;
}

export function renderMemeTableEdit(tableBodyElement, memes) {
    if (!memes || memes.length === 0) {
        tableBodyElement.innerHTML = '<tr><td colspan="3" class="meme-empty">Нет мемов</td></tr>';
        return;
    }

    const existingEditRow = document.getElementById('memeEditRow');
    if (existingEditRow) existingEditRow.remove();

    tableBodyElement.innerHTML = memes.map(meme => `
        <tr data-id="${meme.id}" class="meme-row">
            <td><img src="${meme.url || '/memes/' + meme.file_name}" alt="${meme.file_name}" class="meme-preview"></td>
            <td>${meme.file_name}</td>
            <td>${formatCategories(meme)}</td>
        </tr>
    `).join('');
    
    return tableBodyElement;
}

export function showEditCategories(meme) {
    const current_weather_categories = meme.weather_category?.split(',') || [];
    const current_temp_categories = meme.temp_category?.split(',') || [];
    const current_season_categories = meme.season_category?.split(',') || [];

    const edit_row = document.getElementById('memeEditRow');
    if (!edit_row) return;

    const edit_weather_categories = edit_row.querySelector('#editWeatherCategories');
    const edit_temp_categories = edit_row.querySelector('#editTempCategories');
    const edit_season_categories = edit_row.querySelector('#editSeasonCategories');

    if (edit_weather_categories) {
        edit_weather_categories.innerHTML = WEATHER_CATEGORIES.map(category =>
            `<span class="category-option ${current_weather_categories.includes(category) ? 'selected' : ''}" data-value="${category}">${WEATHER_LABELS[category]}</span>`
        ).join('');
    }
    
    if (edit_temp_categories) {
        edit_temp_categories.innerHTML = TEMP_CATEGORIES.map(category =>
            `<span class="category-option ${current_temp_categories.includes(category) ? 'selected' : ''}" data-value="${category}">${TEMP_LABELS[category]}</span>`
        ).join('');
    }
    
    if (edit_season_categories) {
        edit_season_categories.innerHTML = SEASON_CATEGORIES.map(category =>
            `<span class="category-option ${current_season_categories.includes(category) ? 'selected' : ''}" data-value="${category}">${SEASON_LABELS[category]}</span>`
        ).join('');
    }

    edit_row.querySelectorAll('.category-option').forEach(option => {
        option.addEventListener('click', () => option.classList.toggle('selected'));
    });
}
