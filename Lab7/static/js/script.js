function saveEmployeesToLocalStorage() {
    const employees = [];
    for (let i = 1; i <= countEmoloyers; i++) {
        const surname = document.getElementById(`surname_${i}`).value;
        const startDate = document.getElementById(`startDate_${i}`).value;
        const years = document.getElementById(`years_${i}`).value;
        employees.push({ surname, startDate, years });
    }
    localStorage.setItem("employeesData", JSON.stringify(employees));
}

function loadEmployeesFromLocalStorage() {
    const saved = localStorage.getItem("employeesData");
    if (!saved) return;
    try {
        const employees = JSON.parse(saved);
        for (let i = 1; i <= countEmoloyers; i++) {
            const emp = employees[i-1];
            if (emp.surname) document.getElementById(`surname_${i}`).value = emp.surname;
            if (emp.startDate) document.getElementById(`startDate_${i}`).value = emp.startDate;
            if (emp.years) document.getElementById(`years_${i}`).value = emp.years;
        }
    } catch(e) {}
}

function bindAutoSave() {
    for (let i = 1; i <= 10; i++) {
        const surnameField = document.getElementById(`surname_${i}`);
        const startDateField = document.getElementById(`startDate_${i}`);
        const yearsField = document.getElementById(`years_${i}`);
        if (surnameField) surnameField.addEventListener("input", saveEmployeesToLocalStorage);
        if (startDateField) startDateField.addEventListener("change", saveEmployeesToLocalStorage);
        if (yearsField) yearsField.addEventListener("input", saveEmployeesToLocalStorage);
    }
}


function getZodiacSign(day, month) {
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Водолей";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Рыбы";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Овен";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Телец";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Близнецы";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Рак";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Лев";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Дева";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Весы";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Скорпион";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Стрелец";
    return "Козерог"; // 22 дек - 19 янв
}

function getMonthName(monthIndex) {
    const months = [
        "январь", "февраль", "март", "апрель", "май", "июнь",
        "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
    ];
    return months[monthIndex];
}

function getWeekdayName(dayIndex) {
    const weekdays = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
    return weekdays[dayIndex];
}

// Добавление лет к дате с учётом високосности (корректно)
function addYearsToDate(date, years) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
}

// Форматирование даты в ДД.ММ.ГГГГ
function formatDate(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    return `${d.toString().padStart(2,'0')}.${m.toString().padStart(2,'0')}.${y}`;
}

// ========== ГЕНЕРАЦИЯ ТАБЛИЦЫ ДЛЯ 10 СОТРУДНИКОВ ==========
function generateEmployeesTable() {
    const tbody = document.getElementById("employeesBody");
    tbody.innerHTML = "";
    for (let i = 1; i <= countEmoloyers; i++) {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = i;
        // Фамилия
        const surnameCell = row.insertCell(1);
        const surnameInput = document.createElement("input");
        surnameInput.type = "text";
        surnameInput.placeholder = `Сотрудник ${i}`;
        surnameInput.id = `surname_${i}`;
        surnameCell.appendChild(surnameInput);
        // Дата заключения контракта
        const dateCell = row.insertCell(2);
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.id = `startDate_${i}`;
        dateCell.appendChild(dateInput);
        // Срок в годах
        const yearsCell = row.insertCell(3);
        const yearsInput = document.createElement("input");
        yearsInput.type = "number";
        yearsInput.min = "0";
        yearsInput.step = "1";
        yearsInput.placeholder = "лет";
        yearsInput.id = `years_${i}`;
        yearsCell.appendChild(yearsInput);
    }
}

// ========== ОСНОВНЫЕ ФУНКЦИИ ==========

// Расчёт данных по всем сотрудникам
function calculateAllContracts() {
    const employees = [];
    let hasError = false;

    for (let i = 1; i <= countEmoloyers; i++) {
        const surnameInput = document.getElementById(`surname_${i}`);
        const startDateInput = document.getElementById(`startDate_${i}`);
        const yearsInput = document.getElementById(`years_${i}`);

        const surname = surnameInput.value.trim();
        const startDateStr = startDateInput.value;
        const years = parseInt(yearsInput.value);

        if (!surname) {
            alert(`Ошибка: у сотрудника ${i} не указана фамилия.`);
            hasError = true;
            break;
        }
        if (!startDateStr) {
            alert(`Ошибка: у сотрудника ${i} не указана дата начала контракта.`);
            hasError = true;
            break;
        }
        if (isNaN(years) || years < 0) {
            alert(`Ошибка: у сотрудника ${i} указан некорректный срок (должно быть целое неотрицательное число).`);
            hasError = true;
            break;
        }

        const startDate = new Date(startDateStr);
        if (isNaN(startDate.getTime())) {
            alert(`Ошибка: у сотрудника ${i} неверная дата.`);
            hasError = true;
            break;
        }

        const endDate = addYearsToDate(startDate, years);
        const endMonth = endDate.getMonth();    // 0-11
        const endWeekday = endDate.getDay();    // 0-6

        employees.push({
            surname: surname,
            startDate: startDate,
            years: years,
            endDate: endDate,
            endMonthName: getMonthName(endMonth),
            endWeekdayName: getWeekdayName(endWeekday),
            endYear: endDate.getFullYear()
        });
    }

    if (hasError) return null;
    return employees;
}

// Отображение результатов в таблице
function displayResults(employees) {
    const resultsBody = document.getElementById("resultsBody");
    resultsBody.innerHTML = "";
    for (let emp of employees) {
        const row = resultsBody.insertRow();
        row.insertCell(0).innerText = emp.surname;
        row.insertCell(1).innerText = formatDate(emp.startDate);
        row.insertCell(2).innerText = emp.years;
        row.insertCell(3).innerText = formatDate(emp.endDate);
        row.insertCell(4).innerText = emp.endMonthName;
        row.insertCell(5).innerText = emp.endWeekdayName;
    }
    // Показать контейнер с результатами
    document.getElementById("resultsContainer").classList.remove("hidden");
    return employees;
}

// Фильтрация по году
function filterByYear(employees, year) {
    if (!year || isNaN(year)) {
        return "Введите корректный год.";
    }
    const filtered = employees.filter(emp => emp.endYear === year);
    if (filtered.length === 0) {
        return `Нет сотрудников, у которых контракт заканчивается в ${year} году.`;
    } else {
        const surnames = filtered.map(emp => emp.surname).join(", ");
        return `Сотрудники, чей контракт заканчивается в ${year} году: ${surnames}`;
    }
}

// ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
let currentEmployees = [];
let countEmoloyers = 10;

function setupEventListeners() {
    // Знак зодиака
    const zodiacBtn = document.getElementById("getZodiacBtn");
    const birthDateInput = document.getElementById("birthDate");
    const zodiacResultDiv = document.getElementById("zodiacResult");

    zodiacBtn.addEventListener("click", () => {
        const birthDateStr = birthDateInput.value;
        if (!birthDateStr) {
            zodiacResultDiv.innerHTML = "Пожалуйста, выберите дату рождения.";
            return;
        }
        const date = new Date(birthDateStr);
        if (isNaN(date.getTime())) {
            zodiacResultDiv.innerHTML = "Неверная дата.";
            return;
        }
        const day = date.getDate();
        const month = date.getMonth() + 1; // 1-12
        const sign = getZodiacSign(day, month);
        zodiacResultDiv.innerHTML = `Ваш знак зодиака: <strong>${sign}</strong>`;
    });

    // Рассчитать контракты
    const calculateBtn = document.getElementById("calculateBtn");
    calculateBtn.addEventListener("click", () => {
        const employees = calculateAllContracts();
        if (employees) {
            currentEmployees = employees;
            displayResults(employees);
        }
    });

    // Очистить форму (сброс всех полей)
    const resetBtn = document.getElementById("resetBtn");
    resetBtn.addEventListener("click", () => {
        for (let i = 1; i <= countEmoloyers; i++) {
            document.getElementById(`surname_${i}`).value = "";
            document.getElementById(`startDate_${i}`).value = "";
            document.getElementById(`years_${i}`).value = "";
        }
        localStorage.removeItem("employeesData");
        // Скрыть результаты
        document.getElementById("resultsContainer").classList.add("hidden");
        currentEmployees = [];
        document.getElementById("filterResult").innerHTML = "";
        document.getElementById("filterYear").value = "";
    });

    // Фильтр по году
    const filterBtn = document.getElementById("filterBtn");
    const filterYearInput = document.getElementById("filterYear");
    const filterResultDiv = document.getElementById("filterResult");

    filterBtn.addEventListener("click", () => {
        if (!currentEmployees || currentEmployees.length === 0) {
            filterResultDiv.innerHTML = "Сначала нажмите «Рассчитать контракты».";
            return;
        }
        const year = parseInt(filterYearInput.value);
        const message = filterByYear(currentEmployees, year);
        filterResultDiv.innerHTML = message;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    generateEmployeesTable();     
    loadEmployeesFromLocalStorage();
    bindAutoSave();
    setupEventListeners();      
});