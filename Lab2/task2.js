function personConstructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
}

let person1 = new personConstructor('John','McFlurry',33);

let person2 = new personConstructor('Anna', 'Taylor-Joy',27);

function areObjEqual(obj1,obj2) {
    let keys1 = Object.keys(obj1)
    let keys2 = Object.keys(obj2)

    if(keys1.length !== keys2.length){
        return false;
    }

    for (let key of keys1){
        if (obj1[key] !== obj2[key]){
            return false;
        }
    }
    return true;
}

console.log(areObjEqual(person1,person2));