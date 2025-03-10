let arrColor = ["Жовтий","Синій", "Червоний","Чорний","Зелений","Оранжевий"]//2.1

function findLongestAndShortestElem(arr) {
   let longest= arr.reduce((a,b) => (a.length>=b.length?a:b))
    let shortest = arr.reduce((a,b) => (a.length<=b.length?a:b))

    console.log(`Longest color: ${longest}\nShortest color: ${shortest}`)
}

function onlyBlueElem(arr) {
    let result = arr.filter(item => item.toLowerCase().includes()==="синій")
    console.log(result)
}

function joinElem(arr) {
    let str=arr.join(',')
    console.log(str)
}

// findLongestAndShortestElem(arrColor)//2.2
// onlyBlueElem(arrColor)//2.3
// joinElem(arrColor)//2.4