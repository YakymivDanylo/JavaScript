let mark = prompt("Введіть свою оцінку від 0 до 5", " ");

let message = function (mark) {
    return (mark >= 0 && mark <= 2) ? "Незадовільно" :
       ( mark == 3) ? "Задовільно" :
            (mark == 4) ? "Добре" :
               ( mark == 5 )? "Відмінно": "Оцінку не розпізнано";
}
alert(message(mark));