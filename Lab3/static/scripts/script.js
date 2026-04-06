document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', () => {

        const login = prompt('Введите логин:');
        
        if (login === null) {
            alert('Вход отменён');
            return;
        }
        
        if (login === 'Админ') {
            const password = prompt('Введите пароль:');
            
            if (password === null) {
                alert('Вход отменён');
                return;
            }
            
            if (password === 'Чёрный Властелин' || password === 'Черный Властелин') {
                alert('Добро пожаловать!');
            } 
            else {
                alert('Пароль неверен');
            }
        } 
        else {
            alert('Я вас не знаю');
        }
    });

    const namesBtn = document.getElementById('namesBtn');
    const outputArea = document.getElementById('outputArea');

    namesBtn.addEventListener('click', () => {
        const people = [];
        
        while (true) {
            const input = prompt('Введите фамилию и имя (или нажмите "Отмена" для завершения):');
            
            if (input === null) {
                break;
            }
            
            const trimmed = input.trim();
            if (trimmed !== '') {
                people.push(trimmed);
            } 
            else {
                alert('Пожалуйста, введите непустую строку.');
            }
        }
        
        if (people.length === 0) {
            outputArea.innerHTML = '<p>Список пуст. Вы не ввели ни одной фамилии и имени.</p>';
        } 
        else {
            let html = '<ul style="margin: 0; padding-left: 1.5rem;">';
            people.forEach(person => {
                html += `<li>${person}</li>`;
            });
            html += '</ul>';
            outputArea.innerHTML = html;
        }
    });
});