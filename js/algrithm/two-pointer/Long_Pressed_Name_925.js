/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
var isLongPressedName = function(name, typed) {
    const arr1 = name.split('')
    const arr2 = typed.split('')
    const m = arr1.length
    const n  = arr2.length
    let i = 0
    for (let j = 0; j < n; j++) {
        if (i < m && arr1[i] === arr2[j]) {
            i++
        } else {
            if (i === 0) return false
            if (arr1[i - 1] !== arr2[j]) return false
        }
    }
    return i === m
};

const name = "alex", typed = "aaleexa"
const res = isLongPressedName(name, typed)
console.log(res)