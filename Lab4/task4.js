let students = [
    { name: "Андрій", age: 19, course: 2 },
    { name: "Марія", age: 21, course: 3 },
    { name: "Олексій", age: 18, course: 1 },
    { name: "Ірина", age: 22, course: 4 },
    { name: "Владислав", age: 20, course: 2 }
];

function deleteStudentOleksiy(arr) {
    let result = arr.filter(std => std.name!=="Олексій")
    console.log(result)
}

function addStudent(arr) {
    let student = {name:"Данило", age:19,course:2}
    let result = arr.push(student)
    console.log(arr)
}

function sortBasedAge(arr) {
    let result = arr.sort((a,b)=>b.age-a.age)
    console.log(result)
}

function findStudentThirdCourse(arr) {
    let result = arr.filter(std => std.course === 3)
    console.log(result)
}

// deleteStudentOleksiy(students)//4.2
// addStudent(students)//4.3
// sortBasedAge(students)//4.4
// findStudentThirdCourse(students)//4.5
