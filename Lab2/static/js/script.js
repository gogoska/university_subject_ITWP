document.getElementById('HypotenuzaBtn').addEventListener('click', function() {    
    let a = parseFloat(prompt("Введите первый катет:"));
    if (isNaN(a)) return alert("Ошибка: введите число");
    let b = parseFloat(prompt("Введите второй катет:"));
    if (isNaN(b)) return alert("Ошибка: введите число");
    let c = Math.sqrt(a * a + b * b);
    alert(`Гипотенуза = ${c.toFixed(2)}`);
});




function computeTriangleArea() {
    const x1 = parseFloat(document.getElementById('x1')?.value);
    const y1 = parseFloat(document.getElementById('y1')?.value);
    const x2 = parseFloat(document.getElementById('x2')?.value);
    const y2 = parseFloat(document.getElementById('y2')?.value);
    const x3 = parseFloat(document.getElementById('x3')?.value);
    const y3 = parseFloat(document.getElementById('y3')?.value);
    const resultSpan = document.getElementById('triangleAreaResult');
    if (!resultSpan) return;

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3)) {
        resultSpan.innerHTML = 'Площадь: некорректные данные';
        return;
    }
    const area = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)) / 2;
    resultSpan.innerHTML = `Площадь: ${area.toFixed(2)}`;
}

const triangleFields = ['x1', 'y1', 'x2', 'y2', 'x3', 'y3'];
triangleFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('focus', computeTriangleArea);
});
computeTriangleArea();




function computeDistance() {
    const x = parseFloat(document.getElementById('pointX')?.value);
    const y = parseFloat(document.getElementById('pointY')?.value);
    const resultSpan = document.getElementById('distanceResult');
    if (!resultSpan) return;

    if (isNaN(x) || isNaN(y)) {
        resultSpan.innerHTML = 'Расстояние: некорректные данные';
        return;
    }
    const dist = Math.sqrt(x * x + y * y);
    resultSpan.innerHTML = `Расстояние: ${dist.toFixed(4)}`;
}

const pointX = document.getElementById('pointX');
const pointY = document.getElementById('pointY');
if (pointX) pointX.addEventListener('select', computeDistance);
if (pointY) pointY.addEventListener('select', computeDistance);
computeDistance();




function swapValues() {
    const varA = document.getElementById('varA');
    const varB = document.getElementById('varB');
    const swapMsg = document.getElementById('swapResult');
    if (!varA || !varB || !swapMsg) return;

    const temp = varA.value;
    varA.value = varB.value;
    varB.value = temp;
    swapMsg.innerHTML = 'Значения поменяны местами!';
    setTimeout(() => {
        swapMsg.innerHTML = '(значения поменяются при выходе из поля)';
    }, 1500);
}

const inputA = document.getElementById('varA');
const inputB = document.getElementById('varB');
if (inputA) inputA.addEventListener('blur', swapValues);
if (inputB) inputB.addEventListener('blur', swapValues);
