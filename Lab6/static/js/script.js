const menuItems = document.querySelectorAll('nav ul li');
const countryImage = document.getElementById('countryImage');

const countryImages = {
    russia: '../static/images/russia.jpg',
    usa: '../static/images/usa.jpg',
    france: '../static/images/france.jpg',
    china: '../static/images/china.jpg',
    brazil: '../static/images/brazil.jpg'
};

let currentImageSrc = '';
let reductionTimer = null;

// Функция остановки анимации удаления
function stopImageReduction() {
    if (reductionTimer) {
        clearTimeout(reductionTimer);
        reductionTimer = null;
    }
}

// Эффект удаления (уменьшение высоты)
function startImageReduction() {
    if (!countryImage.src || countryImage.classList.contains('hidden')) return;
    
    const currentHeight = countryImage.clientHeight;
    if (currentHeight > 80) {
        countryImage.style.height = (currentHeight - 4) + 'px';
        reductionTimer = setTimeout(startImageReduction, 20);
    } else {
        stopImageReduction();
    }
}

// Отображение изображения выбранной страны
function showCountryImage(countryKey) {
    stopImageReduction();
    const newSrc = countryImages[countryKey];
    if (!newSrc) return;
    
    currentImageSrc = newSrc;
    countryImage.src = newSrc;
    countryImage.style.height = ''; // сброс явной высоты
    countryImage.classList.remove('hidden');
}

// Обработчики для появления стрелки при наведении
menuItems.forEach(item => {
    const arrow = item.querySelector('.arrow');
    
    item.addEventListener('mouseenter', () => {
        if (arrow) arrow.classList.remove('hide');
    });
    
    item.addEventListener('mouseleave', () => {
        if (arrow) arrow.classList.add('hide');
    });
    
    // При клике на пункт меню показываем изображение
    item.addEventListener('click', (e) => {
        const country = item.dataset.country;
        if (country) {
            showCountryImage(country);
        }
    });
});

// Эффект удаления при наведении на изображение
countryImage.addEventListener('mouseenter', () => {
    if (!countryImage.classList.contains('hidden')) {
        startImageReduction();
    }
});

// Остановка удаления, если мышь ушла с картинки
countryImage.addEventListener('mouseleave', () => {
    stopImageReduction();
});