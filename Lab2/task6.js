let month = prompt("Введіть місяць року", "Грудень");

let season = function (month) {
    if (month === "Грудень" || month === "Січень"  || month === "Лютий"){
        return "Зима";
    } else if (month === "Березень" || month === "Квітень" || month === "Травень"){
        return "Весна";
    } else if (month === "Червень" || month === "Липень" || month === "Серпень"){
        return "Літо";
    }else if (month === "Вересень" || month === "Жовтень" || month === "Листопад"){
        return "Осінь";
    }
    else {
        return "Місяць року не розпізнано";
    }
}

alert(season(month));