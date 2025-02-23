function isInRange(minValue, maxValue, num) {
   return (num > minValue && num < maxValue)
}

let number = 5;
let leftValue = -20;
let rightValue = 25;

let result = isInRange(leftValue,rightValue,number);
console.log(result)