let lightRed = document.getElementById('lightRed');
let lightYellow = document.getElementById('lightYellow');
let lightGreen = document.getElementById('lightGreen');
let stateText = document.getElementById('stateText');
let manualButton = document.getElementById('manualButton');

let redTime = parseInt(prompt("Введіть тривалість червоного світла (мс):", "5000")) || 5000;
let yellowTime = parseInt(prompt("Введіть тривалість жовтого світла (мс):", "3000")) || 3000;
let greenTime = parseInt(prompt("Введіть тривалість зеленого світла (мс):", "7000")) || 7000;
let blinkTime = 2000;

let states = [
    { light: lightRed, text: "Червоний", time: redTime },
    { light: lightYellow, text: "Жовтий", time: yellowTime },
    { light: lightGreen, text: "Зелений", time: greenTime },
    { light: lightYellow, text: "Миготливий жовтий", time: 0 }
];

let currentIndex = 0;
let isManual = false;

function changeLight() {
    if (isManual) return;

    resetLights();

    let state = states[currentIndex];
    state.light.classList.remove('off');
    stateText.innerText = state.text;

    console.log("The color is " + state.text);

    if (currentIndex === 3) {
        blinkYellow(3);
    } else {
        currentIndex = (currentIndex + 1) % 3;
        if (currentIndex === 0) currentIndex = 3;
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

function manualSwitch() {
    isManual = true;
    resetLights();

    currentIndex = (currentIndex + 1) % states.length;
    states[currentIndex].light.classList.remove('off');
    stateText.innerText = states[currentIndex].text;
}

changeLight();

manualButton.addEventListener('click', manualSwitch);
