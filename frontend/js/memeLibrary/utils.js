import { WEATHER_LABELS, TEMP_LABELS, SEASON_LABELS } from './constants.js';

export function formatCategories(meme) {
    const formatted_categories = [];
    const add_categories = (str, fn) => {
        if (!str) return;
        str.split(',').map(category => category.trim()).forEach(category => {
            const translated_label = fn(category);
            if (translated_label && !formatted_categories.includes(translated_label)) {
                formatted_categories.push(translated_label);
            }
        });
    };
    
    add_categories(meme.weather_category, getWeatherLabel);
    add_categories(meme.temp_category, getTempLabel);
    add_categories(meme.season_category, getSeasonLabel);
    
    return formatted_categories.length > 0 ? formatted_categories.join(', ') : 'Без категорий';
}

export function getWeatherLabel(value) {
    return WEATHER_LABELS[value] || value;
}

export function getTempLabel(value) {
    return TEMP_LABELS[value] || value;
}

export function getSeasonLabel(value) {
    return SEASON_LABELS[value] || value;
}
