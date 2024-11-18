
const calc = function(path) {
    var s = 0
    for (let i = 0; i < path.length; i++) {
        s = s * 10 + path[i]
    }
    return s
}

const path = [2, 3, 4]
const res = calc(path)
console.log(res)
