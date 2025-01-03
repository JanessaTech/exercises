const test = [[1, 2], [3, 4], [5, 6]]
for (let next of test) {
    next[0] = 5
}
console.log(test)