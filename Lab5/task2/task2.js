let lightRed = document.getElementById('lightRed');
let lightYellow = document.getElementById('lightYellow');
let lightGreen = document.getElementById('lightGreen');
let stateText = document.getElementById('stateText');
let manualButton = document.getElementById('manualButton');

// Отримуємо тривалість для кожного кольору від користувача
let redTime = parseInt(prompt("Введіть тривалість червоного світла (мс):", "5000")) || 5000;
let yellowTime = parseInt(prompt("Введіть тривалість жовтого світла (мс):", "3000")) || 3000;
let greenTime = parseInt(prompt("Введіть тривалість зеленого світла (мс):", "7000")) || 7000;
let blinkTime = 2000; // Фіксований час миготливого жовтого

// Масив станів світлофора
let states = [
    { light: lightRed, text: "Червоний", time: redTime },
    { light: lightYellow, text: "Жовтий", time: yellowTime },
    { light: lightGreen, text: "Зелений", time: greenTime },
    { light: lightYellow, text: "Миготливий жовтий", time: 0 }
];

let currentIndex = 0;
let isManual = false; // Чи ввімкнений ручний режим

function changeLight() {
    if (isManual) return; // Якщо вручну керуємо - автоматичне перемикання не працює

    resetLights();

    let state = states[currentIndex];
    state.light.classList.remove('off');
    stateText.innerText = state.text; // Відображаємо текст

    console.log("The color is " + state.text);

    if (currentIndex === 3) {
        blinkYellow(3);
    } else {
        currentIndex = (currentIndex + 1) % 3;
        if (currentIndex === 0) currentIndex = 3; // Після зеленого -> миготливий жовтий
        setTimeout(changeLight, state.time);
    }
}

function resetLights() {
    lightRed.classList.add('off');
    lightYellow.classList.add('off');
    lightGreen.classList.add('off');
}

function blinkYellow(times) {
    let blinkCount = 0;
    let interval = setInterval(() => {
        lightYellow.classList.toggle('off');
        blinkCount++;

        if (blinkCount === times * 2) {
            clearInterval(interval);
            setTimeout(() => {
                currentIndex = 0;
                changeLight();
            }, 1000);
        }
    }, 500);
}

// Функція для ручного перемикання станів
function manualSwitch() {
    isManual = true; // Вимикаємо автоматичний режим
    resetLights();

    currentIndex = (currentIndex + 1) % states.length;
    states[currentIndex].light.classList.remove('off');
    stateText.innerText = states[currentIndex].text;
}

// Запускаємо світлофор
changeLight();

// Прив'язуємо кнопку для ручного перемикання
manualButton.addEventListener('click', manualSwitch);
