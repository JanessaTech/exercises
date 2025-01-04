const tests = [[1, 2], [3, 4], [5, 6]]
function change(e) {
    if (e[0] === 3) {
        e = [2, 2, 2]
    }
}
for (let t of tests) {
    change(t)
}
console.log(tests)