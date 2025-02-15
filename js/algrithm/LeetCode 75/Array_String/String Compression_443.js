var compress = function(chars) {
    let cnt = 0
    let pre = undefined
    let write = 0

    const fill = function(ch, num) {
        chars[write++] = pre
        if (num > 1) {
            const cnt_arr = (num + '').split('')
            let j = 0
            while (j < cnt_arr.length) chars[write++] = cnt_arr[j++]
        } 
    }
    
    for (let i = 0; i < chars.length; i++) {
        let cur = chars[i]
        if(!pre) {
            cnt++
            pre = cur
        } else {
            if (pre === cur) {
                cnt++
            } else {
                fill(pre, cnt)
                cnt= 1
                pre = cur
            }
        }

    }
    fill(pre, cnt)
    return write
};

const chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
const res = compress(chars)
console.log(res)
console.log(chars)