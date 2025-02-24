const list = [[3, 4], [1,3], [1, 2],  [2, 2]]
list.sort((a, b) => {
    if (a[0] === b[[0]]) {
        return a[1] - b[1]
    } else {
        return a[0] - b[0]
    }
})

console.log(list)