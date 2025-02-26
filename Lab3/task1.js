function fibonacci(n) {
    if (n===1 || n === 2) return 1;
    return fibonacci(n-1) + fibonacci(n-2)
}

function fibonacciSum(num) {
    let sum =0, count = 1;
    while(count <= num){
        sum += fibonacci(count)
        count++;
    }
    return sum;
}
console.log(fibonacciSum(10))


