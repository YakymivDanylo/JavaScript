let timeout;
const lamp = document.getElementById('lamp');

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        lamp.classList.remove('on');
    }, 3000);
}

function toggleLamp() {
    lamp.classList.toggle('on');
    resetTimer();
}

function changeLampType() {
    const types = ['gray','yellow','blue','green'];
    let currentColor = lamp.style.backgroundColor;
    let newIndex = (types.indexOf(currentColor)+1)%types.length;// унеможливлюємо вихід за межі масиву
    lamp.style.backgroundColor = types[newIndex];
    if (lamp.classList.contains('on')) {
        resetTimer();
    }
}

function setBrightness() {
    let brightness = prompt('Введіть яскравість від 0 до 100 %');
    if (brightness !== null && brightness >=0 && brightness<= 100){
        lamp.style.opacity = brightness / 100;
    }
    resetTimer();
}
