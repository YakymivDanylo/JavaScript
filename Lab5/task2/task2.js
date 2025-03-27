let lightRed = document.getElementById('lightRed');
let lightYellow = document.getElementById('lightYellow');
let lightGreen = document.getElementById('lightGreen');

let states = [{light: lightRed, time:5000},
    {light:lightYellow, time:3000},
    {light:lightGreen,time:7000}];

let currentIndex = 0;

function changeLight() {
    lightRed.classList.add('off');
    lightYellow.classList.add('off');
    lightGreen.classList.add('off');

    states[currentIndex].light.classList.remove('off');

    let time = states[currentIndex].time;

    currentIndex = (currentIndex + 1) % states.length;

    setTimeout(changeLight,time);

}

changeLight()