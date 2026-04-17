$(document).ready(function() {
    function changeAttribute(elementId, attrName, newValue) {
        $('#' + elementId).attr(attrName, newValue);
    }

    // Задание 1: два альтернативных способа выбора logo.jpg
    function task1() {
        // Способ 1: по id
        var logoById = $('#logo');
        // Способ 2: по классу и атрибуту alt
        var logoByAlt = $('img[alt="Логотип"]');
        
        console.log('Логотип выбран по id:', logoById.length);
        console.log('Логотип выбран по alt:', logoByAlt.length);
    }

    // Задание 2: все картинки, кроме первой + функция
    function task2() {
        var allImages = $('img');               
        var firstImage = allImages.first();     
        var others = allImages.not(firstImage); 
        others.hide(5000);                      
        
        changeAttribute('logo', 'title', 'Новый заголовок логотипа');
    }

    // Задание 3: работа с картинкой moto2.jpg
    function task3() {
        var $moto2 = $('#logo');
        
        $moto2.css('border', '1px solid #333');
        
        // Анимация увеличения толщины рамки до 5px за 5 секунд
        $moto2.animate({
            borderWidth: '5px'
        }, 5000, function() {
            // По окончании анимации плавно скрываем шапку
            $('#main-header').fadeTo(2000, 0.3);
        });
        
        // Добавление нового абзаца в конец body
        $('body').append('<p id="newparagraph">Это новый абзац, добавленный jQuery.</p>');
        // Цепные функции: меняем фон и цвет текста
        $('#newparagraph').css('background-color', 'black').css('color', 'white');
    }

    $('#runTasks').on('click', function() {
        task1();
        task2();
        task3();
        $(this).prop('disabled', true).text('Задания запущены');
    });
});