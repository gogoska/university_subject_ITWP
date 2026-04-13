function getTaskScore(taskName) {
    const selected = document.querySelector(`input[name="${taskName}"]:checked`);
    if (selected) {
        return parseInt(selected.value)
    }
    else { 
        return 0 
    }
}

function getAllScores() {
    const scores = [];
    for (let i = 1; i <= 6; i++) {
        scores.push(getTaskScore(`task${i}`));
    }
    return scores;
}

function calculateTotal(scores) {
    let total = 0;
    for (let i = 0; i < scores.length; i++) {
        total += scores[i];
    }
    return total;
}

function determinePlace(scores) {
    const allMax = scores.every(s => s === 30);
    if (allMax) return { place: 1, text: "1 МЕСТО (все задачи на 30 баллов)" };

    const allAtLeast20 = scores.every(s => s >= 20);
    const has30 = scores.some(s => s === 30);
    if (allAtLeast20 && has30) {
        return { place: 2, text: "2 МЕСТО (все задачи ≥20, есть 30 баллов)" };
    }

    const all20 = scores.every(s => s === 20);
    if (all20) return { place: 3, text: "3 МЕСТО (все задачи по 20 баллов)" };

    return { place: 0, text: "Призовое место не присуждается" };
}

function validateForm() {
    const surname = document.getElementById("surname").value.trim();
    const school = document.getElementById("school").value.trim();

    if (surname === "") {
        alert("Укажите фамилию участника");
        return false;
    }
    if (school === "" || isNaN(school) || parseInt(school) <= 0) {
        alert("Введите корректный номер школы");
        return false;
    }
    return true;
}

function processAnketa() {
    if (!validateForm()) return;

    const surname = document.getElementById("surname").value.trim();
    const school = document.getElementById("school").value.trim();

    const scores = getAllScores();
    const total = calculateTotal(scores);
    const placeInfo = determinePlace(scores);

    // Отображаем результат
    document.getElementById("resSurname").innerText = surname;
    document.getElementById("resSchool").innerText = school;
    document.getElementById("resSum").innerText = total;
    document.getElementById("resPlace").innerHTML = placeInfo.text;

    const resultBlock = document.getElementById("resultBlock");
    resultBlock.classList.remove("hidden");
}

function resetFormAndHideResult() {
    const resultBlock = document.getElementById("resultBlock");
    resultBlock.classList.add("hidden");
    for (let i = 1; i <= 6; i++) {
        const zeroRadio = document.querySelector(`input[name="task${i}"][value="0"]`);
        if (zeroRadio) {
            zeroRadio.checked = true;
            break;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const calcBtn = document.getElementById("calcBtn");
    const resetBtn = document.getElementById("resetBtn");

    if (calcBtn) calcBtn.addEventListener("click", processAnketa);
    if (resetBtn) resetBtn.addEventListener("click", resetFormAndHideResult);
});