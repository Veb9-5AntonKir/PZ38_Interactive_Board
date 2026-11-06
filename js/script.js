// 3. Находим элементы строго по ID и классам из вашего HTML
const searchInput = document.getElementById('search-input');
const addForm = document.getElementById('idea-form');
const cardContainer = document.getElementById('ideas-list');
const favoriteCounter = document.getElementById('favorite-count');

// Функция обновления счетчика избранного (Пункт 7)
function updateFavoriteCount() {
    if (!favoriteCounter || !cardContainer) return;
    // Считаем кнопки, у которых добавлен класс active
    const activeFavorites = cardContainer.querySelectorAll('.fav-button.active').length;
    favoriteCounter.textContent = activeFavorites;
}

// Функция фильтрации карточек (Пункт 4)
function filterCards(query) {
    const cleanQuery = query.toLowerCase().trim();
    const cards = cardContainer.querySelectorAll('.idea-card');

    cards.forEach(card => {
        const title = (card.dataset.title || '').toLowerCase();
        if (title.includes(cleanQuery)) {
            card.style.display = ''; // Показываем подходящие
        } else {
            card.style.display = 'none'; // Скрываем неподходящие
        }
    });
}

// 4. Фильтрация по событию input
searchInput.addEventListener('input', (e) => {
    filterCards(e.target.value);
});

// 5. Обработка Escape в поле поиска
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchInput.value = '';
        filterCards('');
    }
});

// 6. Создание новой карточки на submit формы
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Получаем инпут внутри формы по его ID
    const inputField = document.getElementById('idea-input');
    const text = inputField.value.trim();
    
    if (!text) return;

    // Создаем элемент списка <li>, как в вашем HTML
    const newCard = document.createElement('li');
    newCard.classList.add('idea-card');
    newCard.dataset.title = text; // Устанавливаем data-title для фильтрации

    // Копируем структуру разметки карточки из вашего HTML
    newCard.innerHTML = `
        <span>${text}</span>
        <button 
            class="fav-button" 
            type="button" 
            aria-label="Добавить в избранное" 
            aria-pressed="false"
        >☆</button>
    `;

    // Добавляем новую карточку в список
    cardContainer.appendChild(newCard);

    // Учитываем текущий фильтр поиска
    filterCards(searchInput.value);

    // Очищаем поле ввода формы
    addForm.reset();
});

// 7. Один обработчик click на общий список (Делегирование)
cardContainer.addEventListener('click', (e) => {
    // Проверяем клик по кнопке с классом fav-button
    if (e.target.classList.contains('fav-button')) {
        const btn = e.target;
        
        // Переключаем класс active
        btn.classList.toggle('active');
        
        // Меняем символ звезды и aria-pressed в зависимости от состояния
        if (btn.classList.contains('active')) {
            btn.textContent = '★';
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.textContent = '☆';
            btn.setAttribute('aria-pressed', 'false');
        }

        // Обновляем счётчик избранного
        updateFavoriteCount();
    }
});

// Первоначальный расчёт счётчика при загрузке страницы
updateFavoriteCount();
