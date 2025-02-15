/**
 * @param {string} s
 * @return {string}
 */
var reverseOnlyLetters = function(s) {
    let arr = s.split('')
    for (let i = 0, j = arr.length - 1; i < j;) {
        if (!isLetter(arr[i])) {
            i++
            continue
        }
        if (!isLetter(arr[j])) {
            j--
            continue
        }
        swap(arr, i++, j--)
    }
    return arr.join('')
    
};

function swap(arr, i, j) {
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}

function isLetter(ch) {
    return ch.toLowerCase() !== ch.toUpperCase()
}


const s = "a-bC-dEf-ghIj"

const res = reverseOnlyLetters(s)
console.log(res) 
console.log(isLetter('a'))