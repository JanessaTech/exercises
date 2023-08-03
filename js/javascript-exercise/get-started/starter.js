const m0 = new Map([[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd'], [4, 'e'], [5, 'f']])
const m1 = new Map([...m0].filter((v, k) => k > 3))
console.log(m1)


