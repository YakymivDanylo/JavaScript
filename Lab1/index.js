let title = document.querySelector("h1");

title.addEventListener("mouseover",function () {
    title.innerHTML="Hello world!"
});

title.addEventListener("mouseout",function () {
    title.innerHTML="Наведіть курсор"
})

let element2 = document.querySelector("button");

element2.addEventListener("click",function () {
    console.warn("Якимів Данило")
    element2.innerHTML="Погляньте в консоль"
})

element2.addEventListener("mouseout",function () {
    element2.innerHTML="Натисніть кнопку"
})

