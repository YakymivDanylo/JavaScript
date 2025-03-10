let employees = [
    { name: "Олександр", age: 35, position: "Менеджер" },
    { name: "Марія", age: 28, position: "Дизайнер" },
    { name: "Іван", age: 40, position: "Розробник" },
    { name: "Анна", age: 25, position: "Маркетолог" },
    { name: "Петро", age: 30, position: "Тестувальник" }
];//3.1

function sortArr(arr) {
    let result = arr.sort((a,b)=>a.name.localeCompare(b.name))
    console.log(result)
}

function findPosition(arr) {
    let result = arr.filter(key=>key.position.toLowerCase()==="розробник")
     console.log(result)
}

function deleteElemWithKey(arr) {//Ф-ція видаляє працівників віком більше 30 років
    let result = arr.filter(item=>item.age<30)
    console.log(result)
}

function addEmp(arr) {
    let emp ={name:"Данило", age:19,position:"Студент"}
    let result = arr.push(emp)
    console.log(arr)
}

// sortArr(employees)//3.2
// findPosition(employees)//3.3
// deleteElemWithKey(employees)//3.4
// addEmp(employees)//3.5

