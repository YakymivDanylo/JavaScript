function oddNumberArr(arr) {
    let array = arr;
    let oddArr = [];
    for (let i = 0; i<array.length;i++){
        if(array[i].length % 2 !== 0){
            oddArr.push(array[i])
        }
    }
    return oddArr;
}

let arr = ["to","odd","numbers","here"];
let result = oddNumberArr(arr);
console.log(result);

