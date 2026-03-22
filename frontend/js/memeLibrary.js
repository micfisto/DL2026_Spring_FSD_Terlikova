import { loadAllMemes, deleteMeme, saveMemeChanges, uploadMeme } from './memeLibrary/api.js';
import { renderMemeGallery, renderMemeTable, renderMemeTableEdit, showEditCategories } from './memeLibrary/renderers.js';

// DOM элементы
const libraryOpenButton = document.getElementById('libraryBtn');
const libraryOverlayElement = document.getElementById('memeLibraryOverlay');
const libraryCloseButton = document.getElementById('memeLibraryClose');
const memeUploadButton = document.getElementById('uploadMemeBtn');
const memeDeleteButton = document.getElementById('deleteMemeBtn');
const memeEditButton = document.getElementById('editMemeBtn');

// Секции интерфейса
const uploadSectionElement = document.getElementById('memeUploadSection');
const deleteSectionElement = document.getElementById('memeDeleteSection');
const editSectionElement = document.getElementById('memeEditSection');
const categorySelectorElement = document.getElementById('memeCategories');

// Кнопка отправки формы
const uploadSubmitButtonElement = document.getElementById('memeUploadSubmit');

// Контейнеры галерей
const deleteGalleryContainer = document.getElementById('memeGalleryDelete');
const editGalleryContainer = document.getElementById('memeGalleryEdit');

// Данные выбранных элементов
let currentSelectedCategories = { weather: [], temp: [], season: [] };
let currentEditingMeme = null;
let loadedMemesList = [];

// Обработчики событий
libraryOpenButton.addEventListener('click', () => {
    libraryOverlayElement.classList.add('active');
    resetAllSections();
    loadAllMemesData();
});

libraryCloseButton.addEventListener('click', () => {
    libraryOverlayElement.classList.remove('active');
    resetAllSections();
});

libraryOverlayElement.addEventListener('click', (e) => {
    if (e.target === libraryOverlayElement) {
        libraryOverlayElement.classList.remove('active');
        resetAllSections();
    }
});

// Функции
function resetAllSections() {
    uploadSectionElement.classList.remove('visible');
    deleteSectionElement.style.display = 'none';
    editSectionElement.style.display = 'none';

    categorySelectorElement.classList.remove('visible');
    uploadSubmitButtonElement.classList.remove('visible');
    
    currentSelectedCategories = { weather: [], temp: [], season: [] };
    currentEditingMeme = null;
    
    document.querySelectorAll('.meme-library-button').forEach(button => button.classList.remove('active'));
    document.querySelectorAll('#memeCategories .category-option').forEach(option => option.classList.remove('selected'));

    const editRowElement = document.getElementById('memeEditRow');
    if (editRowElement) editRowElement.remove();
}

async function loadAllMemesData() {
    loadedMemesList = await loadAllMemes();
}

// Обработчики для загрузки мемов
memeUploadButton.addEventListener('click', () => {
    resetAllSections();
    memeUploadButton.classList.add('active');
    uploadSectionElement.classList.add('visible');
    categorySelectorElement.classList.add('visible');
});

document.querySelectorAll('#memeCategories .category-option').forEach(option => {
    option.addEventListener('click', () => {
        option.classList.toggle('selected');
        const optionValue = option.dataset.value;
        const categoryType = option.parentElement.id.replace('Categories', '');
        currentSelectedCategories[categoryType] = currentSelectedCategories[categoryType].includes(optionValue)
            ? currentSelectedCategories[categoryType].filter(value => value !== optionValue)
            : [...currentSelectedCategories[categoryType], optionValue];
        updateUploadButtonState();
    });
});

function updateUploadButtonState() {
    const fileInputElement = document.getElementById('memeFileInput');
    const hasSelectedFile = fileInputElement?.files.length > 0;
    const hasSelectedCategories = currentSelectedCategories.weather.length || currentSelectedCategories.temp.length || currentSelectedCategories.season.length;
    uploadSubmitButtonElement.classList.toggle('visible', hasSelectedFile && hasSelectedCategories);
}

document.getElementById('memeFileInput').addEventListener('change', updateUploadButtonState);

uploadSubmitButtonElement.addEventListener('click', async () => {
    const fileInputElement = document.getElementById('memeFileInput');
    const selectedFile = fileInputElement.files[0];
    if (!selectedFile) return alert('Пожалуйста, выберите файл изображения');

    const uploadSuccess = await uploadMeme(selectedFile, currentSelectedCategories);
    if (uploadSuccess) {
        fileInputElement.value = '';
        currentSelectedCategories = { weather: [], temp: [], season: [] };
        document.querySelectorAll('#memeCategories .category-option').forEach(option => option.classList.remove('selected'));
        uploadSubmitButtonElement.classList.remove('visible');
        loadAllMemesData();
    }
});

// Обработчики для удаления мемов
memeDeleteButton.addEventListener('click', () => {
    resetAllSections();
    memeDeleteButton.classList.add('active');
    deleteSectionElement.style.display = 'block';
    renderMemeTable(deleteGalleryContainer, loadedMemesList, 'Удалить');
    
    deleteGalleryContainer.querySelectorAll('.meme-action-button').forEach(actionButton => {
        actionButton.addEventListener('click', async (event) => {
            const memeId = parseInt(event.target.dataset.id);
            if (confirm('Вы уверены, что хотите удалить этот мем?')) {
                const deleteSuccess = await deleteMeme(memeId);
                if (deleteSuccess) {
                    await loadAllMemesData();
                    renderMemeTable(deleteGalleryContainer, loadedMemesList, 'Удалить');
                }
            }
        });
    });
});

// Обработчики для редактирования мемов
memeEditButton.addEventListener('click', () => {
    resetAllSections();
    memeEditButton.classList.add('active');
    editSectionElement.style.display = 'block';
    currentEditingMeme = null;
    renderMemeTableEdit(editGalleryContainer, loadedMemesList);
    
    editGalleryContainer.querySelectorAll('tr[data-id]').forEach(tableRow => {
        tableRow.style.cursor = 'pointer';
        tableRow.addEventListener('click', () => {
            const existingEditRow = document.getElementById('memeEditRow');
            if (existingEditRow) existingEditRow.remove();

            const memeId = parseInt(tableRow.dataset.id);
            const foundMeme = loadedMemesList.find(meme => meme.id === memeId);
            currentEditingMeme = foundMeme;

            const editRowElement = document.createElement('tr');
            editRowElement.id = 'memeEditRow';
            editRowElement.innerHTML = `
                <td colspan="3">
                    <div id="memeEditCategories">
                        <h4>Категории (нажмите для выбора):</h4>
                        <div class="meme-categories visible" id="editCategories">
                            <div class="category-group">
                                <h4>Погода:</h4>
                                <div class="category-options" id="editWeatherCategories"></div>
                            </div>
                            <div class="category-group">
                                <h4>Температура:</h4>
                                <div class="category-options" id="editTempCategories"></div>
                            </div>
                            <div class="category-group">
                                <h4>Время года:</h4>
                                <div class="category-options" id="editSeasonCategories"></div>
                            </div>
                        </div>
                        <button class="meme-submit-button visible" id="memeEditSubmit">Сохранить изменения</button>
                    </div>
                </td>
            `;
            tableRow.after(editRowElement);
            showEditCategories(foundMeme);

            document.getElementById('memeEditSubmit').addEventListener('click', async () => {
                if (!currentEditingMeme) return;

                const selectedWeatherCategories = [], selectedTempCategories = [], selectedSeasonCategories = [];
                document.querySelectorAll('#editWeatherCategories .category-option.selected').forEach(option => selectedWeatherCategories.push(option.dataset.value));
                document.querySelectorAll('#editTempCategories .category-option.selected').forEach(option => selectedTempCategories.push(option.dataset.value));
                document.querySelectorAll('#editSeasonCategories .category-option.selected').forEach(option => selectedSeasonCategories.push(option.dataset.value));

                const saveSuccess = await saveMemeChanges(currentEditingMeme.id, {
                    weather: selectedWeatherCategories,
                    temp: selectedTempCategories,
                    season: selectedSeasonCategories
                });

                if (saveSuccess) {
                    await loadAllMemesData();
                    const editRowToRemove = document.getElementById('memeEditRow');
                    if (editRowToRemove) editRowToRemove.remove();
                    currentEditingMeme = null;
                    renderMemeTableEdit(editGalleryContainer, loadedMemesList);
                }
            });
        });
    });
});
