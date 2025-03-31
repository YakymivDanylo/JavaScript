document.addEventListener("DOMContentLoaded", function () {

    function updateClock() {
        let now = new Date();
        let hours = String(now.getHours()).padStart(2, "0");
        let minutes = String(now.getMinutes()).padStart(2, "0");
        let seconds = String(now.getSeconds()).padStart(2, "0");

        document.getElementById("clock").innerHTML = `${hours}:${minutes}:<span class="blink">${seconds}</span>`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    document.getElementById("startCountdown").addEventListener("click", function () {
        let targetDate = new Date(document.getElementById("countdownInput").value);
        let countdownDisplay = document.getElementById("countdown");

        function updateCountdown() {
            let now = new Date();
            let diff = targetDate - now;

            if (diff <= 0) {
                countdownDisplay.innerHTML = "Час вийшов!";
                return;
            }

            let days = Math.floor(diff / (1000 * 60 * 60 * 24));
            let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            let minutes = Math.floor((diff / (1000 * 60)) % 60);
            let seconds = Math.floor((diff / 1000) % 60);

            countdownDisplay.innerHTML = `${days} днів ${hours} годин ${minutes} хв ${seconds} сек`;
            setTimeout(updateCountdown, 1000);
        }
        updateCountdown();
    });


    function renderCalendar(year, month) {
        let calendar = document.getElementById("calendar");
        let firstDay = new Date(year, month, 1).getDay();
        let lastDate = new Date(year, month + 1, 0).getDate();

        let monthNames = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
        document.getElementById("currentMonth").innerText = `${monthNames[month]} ${year}`;

        let daysHtml = "";
        for (let i = 0; i < firstDay; i++) {
            daysHtml += `<div class="empty"></div>`;
        }
        for (let i = 1; i <= lastDate; i++) {
            daysHtml += `<div class="day">${i}</div>`;
        }
        calendar.innerHTML = daysHtml;
    }

    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();

    renderCalendar(currentYear, currentMonth);

    document.getElementById("prevMonth").addEventListener("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    document.getElementById("nextMonth").addEventListener("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    document.getElementById("birthdayCalc").addEventListener("click", function () {
        let birthDate = new Date(document.getElementById("birthdayInput").value);
        let now = new Date();
        let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());

        if (nextBirthday < now) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }

        let diff = nextBirthday - now;
        let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        let days = Math.floor(diff / (1000 * 60 * 60 * 24) % 30);
        let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((diff / (1000 * 60)) % 60);
        let seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("birthdayResult").innerHTML = `До дня народження залишилось: ${months} міс ${days} дн ${hours} год ${minutes} хв ${seconds} сек`;
    });
});
