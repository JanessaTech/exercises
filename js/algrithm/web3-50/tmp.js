

const res = [1, 2, 3, 4]
const idx = res.indexOf(1)
console.log(idx)
const p1 = res.slice(0, idx)
const p2 = res.slice(idx + 1)
console.log(p1)
console.log(p2)