function dayOfWeek(num) {
    switch (num) {
        case '1':
            console.log("Понеділок");
            break;
        case '2':
            console.log("Вівторок");
            break;
        case '3':
            console.log("Середа");
            break;
        case '4':
            console.log("Четвер");
            break;
        case '5':
            console.log("П'ятниця");
            break;
        case '6':
            console.log("Субота");
            break;
        case '7':
            console.log("Неділя");
            break;
        default:
            console.log("День не розпізнаний");
    }
}

let day = prompt("Введіть число від одного до семи","");
dayOfWeek(day);