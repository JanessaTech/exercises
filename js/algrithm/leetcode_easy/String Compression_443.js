/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
    let pre = undefined, cnt = 0
    let write = 0

    const fill = function(ch, cnt) {
        chars[write++] = ch
        if (cnt > 1) {
            const len = (cnt + '').split('')
            for (let l of len) chars[write++] = l
        }
    }

    for (let ch of chars) {
        if (!pre) {
            pre = ch
            cnt = 1
        } else {
            if (ch === pre) {
                cnt++
            } else {
                fill(pre, cnt)
                pre = ch
                cnt = 1
            }
        }
    }

    fill(pre, cnt)
    return write
};