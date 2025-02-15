var compress = function(chars) {
    let cnt = 0
    let pre = undefined
    let write = 0
    const fill = function(ch, num) {
        chars[write++] = ch
        if (num > 1) {
            const arr = (num +'').split('')
            for (let a of arr) {
                chars[write++] = a
            }
        }
    }
    for (let i = 0; i < chars.length;i++) {
        const ch = chars[i]
        if (!pre) {
            cnt++
            pre = ch
        } else {
            if (pre === ch) {
                cnt++
            } else {
                fill(pre, cnt)
                cnt = 1
                pre = ch
            }
        }
    }
    fill(pre, cnt)

    return write
}

const chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
const res = compress(chars)
console.log(res)
console.log(chars)