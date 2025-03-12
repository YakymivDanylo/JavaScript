let numbers =[42, 17, 8, 99, 23, 56, 74, 3, 15, 67]

let additionalArr=[-50,12,-3]

function squareEachNumber(arr) {
    let result = arr.map(elem=> elem*elem)
    console.log(result)
}

function filterNumber(arr) {
    let result = arr.filter(num=>num%2===0)
    console.log(result)
}

function sumArrayNumbers(arr) {
    let result = arr.reduce((sum,current)=> sum+current,0)
    console.log(result)
}

function addTwoArrays(arr1,arr2) {
    arr1.splice(arr1.length,0,...arr2)
    console.log(arr1)
}

function deleteFirstThreeElem(arr) {
    console.log(`First version of array ${arr}`)
    let changedArr=arr.splice(3,arr.length-1)
    console.log(`changedArr ${changedArr}`)
}


// squareEachNumber(numbers)//5.1
// filterNumber(numbers)//5.2
// sumArrayNumbers(numbers)//5.3
// addTwoArrays(numbers,additionalArr)//5.4
// deleteFirstThreeElem(numbers)//5.5