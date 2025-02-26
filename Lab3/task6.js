function sum(a, b) {
    return a + b;
}

function diff(a, b) {
    return a - b;
}

function sumOrDiff(a, b) {
    if (sum(a,b) === 10 || diff(a,b) === 10) return true;
    else return false;
}

let a = prompt("Введіть a:","");
let b = prompt("Введіть b:","");

sum(+a,+b);
diff(+a,+b);
let result = sumOrDiff(+a,+b);
console.log(result);
