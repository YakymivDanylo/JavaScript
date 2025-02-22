let title = document.querySelector("h1");

title.addEventListener("mouseover",function () {
    title.textContent="Hello world!"
});

title.addEventListener("mouseout",function () {
    title.textContent="Наведіть курсор"
})

let element2 = document.querySelector("button");

element2.addEventListener("click",function () {
    console.log("Якимів Данило")
    element2.textContent="Погляньте в консоль"
})

element2.addEventListener("mouseout",function () {
    element2.textContent="Натисніть кнопку"
})

