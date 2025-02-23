function findMinMax(arr) {
    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i]
        }
    }
    return {min: min, max: max};
}

let array = [-11, -6, 0, 12, 27];

let result = findMinMax(array);
console.log(result)