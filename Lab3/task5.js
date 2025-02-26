let newArr = (arr) =>{
    let array = arr;
    for (let i =0; i< array.length;i++){
        array[i] += 1;
    }
    return array;
}
 console.log(newArr([-5,11,20]))