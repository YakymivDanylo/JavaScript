let array = ["Банан", "Яблуко", "Груша", "Апельсин", "Ківі", "Мандарин"]

function delLastElemArr(arr) {
    arr.splice(arr.length - 1, 1)
    console.log("1.1 "+arr)
}

function addNewElem(arr) {
    let element = prompt("Введіть фрукт, який хочете додати ", "")
    arr.unshift(element)
    console.log("1.2 "+arr)
}

function sortReverseAlphabet(arr) {
    arr.sort((a, b) => b.localeCompare(a))
    console.log("1.3 "+arr)
}

function findApple(arr) {
    for (let i = 0;i<arr.length;i++){
        if (arr[i].toLowerCase() === "яблуко") console.log("1.4 "+i);
    }
}


delLastElemArr(array) //1.1
addNewElem(array) //1.2
sortReverseAlphabet(array) //1.3
findApple(array)//1.4


