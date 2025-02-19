var uniqueOccurrences = function(arr) {
    const map = {}
    for (let a of arr) {
        if (map[a]) {
            map[a]++
        } else {
            map[a] = 1
        }
    }
    let values = Object.values(map)
    let uniques = new Set(values)
    return uniques.size === values.length

};