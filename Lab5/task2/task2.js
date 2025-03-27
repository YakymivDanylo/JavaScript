let lightRed = document.getElementById('lightRed');
let lightYellow = document.getElementById('lightYellow');
let lightGreen = document.getElementById('lightGreen');

// Масив із кольорами і часом
let states = [
    { light: lightRed, time: 5000 },   // Червоний
    { light: lightYellow, time: 3000 }, // Жовтий перед зеленим
    { light: lightGreen, time: 7000 },  // Зелений
    { light: lightYellow, time: 0 }     // Миготливий жовтий (мигає 3 рази, а не фіксований час)
];

let currentIndex = 0;

function changeLight() {
    // Вимикаємо всі кольори
    lightRed.classList.add('off');
    lightYellow.classList.add('off');
    lightGreen.classList.add('off');

    // Вмикаємо потрібний колір
    states[currentIndex].light.classList.remove('off');
    console.log("The color is " + states[currentIndex].light.id); // Виводимо поточний колір

    // Якщо поточний колір - миготливий жовтий, починаємо миготіння
    if (states[currentIndex].light === lightYellow && currentIndex === 3) {
        blinkYellow(3);  // Миготіння жовтого 3 рази
        return;  // Зупиняємо подальше виконання цього циклу
    }

    // Якщо це не миготливий жовтий, переходимо до наступного кольору
    let time = states[currentIndex].time;

    // Якщо ми на миготливому жовтому, то час ми не задаємо — воно залежить від кількості мигань
    if (states[currentIndex].light === lightYellow && currentIndex === 3) {
        return; // Миготливий жовтий ми обробляємо окремо
    }

    // Оновлюємо індекс (перехід на наступний колір)
    currentIndex = (currentIndex + 1) % 3; // Переходимо через три кольори (червоний, жовтий, зелений)
    if (currentIndex === 0) {
        currentIndex = 3; // Після зеленого переходимо до миготливого жовтого
    }

    // Викликаємо функцію знову через певний час
    setTimeout(changeLight, time);
}

function blinkYellow(times) {
    let blinkCount = 0;
    let interval = setInterval(() => {
        lightYellow.classList.toggle('off'); // Перемикаємо жовтий
        blinkCount++;

        if (blinkCount === times * 2) {  // Миготить 3 рази (тобто 6 перемикань)
            clearInterval(interval);  // Зупиняємо миготіння
            setTimeout(() => {
                // Після миготливого жовтого, повертаємося до червоного
                currentIndex = 0;
                changeLight();
            }, 1000); // Чекаємо 1 сек перед поверненням до червоного
        }
    }, 500); // Миготить кожні 500 мс
}

// Запускаємо світлофор
changeLight();
