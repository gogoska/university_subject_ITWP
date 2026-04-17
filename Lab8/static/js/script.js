$(document).ready(function() {
    
    function task1() {
        // Задание 1: элементы <li> внутри #my_links, которые содержат <a>
        var liWithLinks = $('#my_links li:has(a)');
        console.log('1. Элементы <li>, содержащие ссылку:');
        liWithLinks.each(function(index) {
            console.log(`   ${index+1}. ${$(this).text().trim()}`);
        });
    }

    function task2() {
        // Задание 2: ссылки внутри #my_links, у которых href начинается с "documents"
        var docLinks = $('#my_links a[href^="documents"]');
        console.log('\n2. Ссылки, начинающиеся с "documents":');
        docLinks.each(function(index) {
            console.log(`   ${index+1}. ${$(this).attr('href')} – ${$(this).text()}`);
        });
    }

    function task3(){
        // Задание 3: последние ячейки в чётных строках таблицы #moto_table
        var allDataRows = $('#moto_table tbody tr');
        var secondHalf = allDataRows.slice(Math.ceil(allDataRows.length / 2));       // вторая половина строк
        var evenRows = secondHalf.filter(':odd');               // чётные строки внутри второй половины

        console.log('\n3. Последние ячейки в чётных строках таблицы:');
        evenRows.each(function(index) {
            var model = $(this).find('td:eq(0)').text();
            var volume = $(this).find('td:eq(1)').text();
            var year = $(this).find('td:eq(2)').text();
            console.log(`   ${index+1}. ${model}, ${volume}, ${year}.`);
        });
    }

    task1();
    task2();
    task3();

    // Кнопка для повторного вывода в консоль (по желанию пользователя)
    $('#showResults').on('click', function() {
        console.clear();
        console.log('=== Повторный вывод результатов ===');
        task1();
        task2();
        task3();
    });
});