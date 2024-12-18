const myArr = [[7,7, 1,2],[3,4, 4],[5,6]];
const newArr = myArr.flat();
const res = [...new Set(newArr)].sort()
console.log(res)

const aa = ["john_newyork@mail.com", "johnsmith@mail.com", "john00@mail.com"]
console.log(aa.sort())
