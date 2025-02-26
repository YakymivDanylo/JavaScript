function isPrime(num) {
    if (num<2) return false;
    for(let i = 2; i < num; i++){
        if(num%i == 0) return false;
    }
    return true;
}

function sumPrimes(lim) {
    let sum =0;
    for (let i =2; i <= lim;i++){
        if (isPrime(i)){
            sum+=i;
        }
    }
    return sum;
}

console.log(sumPrimes(1000))