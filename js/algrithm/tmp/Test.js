const myMap = new Map().set('a', 1).set('b', 2);
const arr = [...myMap];
console.log(arr);
const arr1 = arr.sort((a, b) => b[1] - a[1])
console.log(arr1)
 
