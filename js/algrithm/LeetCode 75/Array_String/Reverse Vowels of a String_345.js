var reverseVowels = function(s) {
    const arr = s.split('')
    const vowels = new Set(['a', 'e', 'i', 'o', 'u'])

    const isVowel = function(ch) {
        const lowercase = ch.toLowerCase()
        return vowels.has(lowercase)
    }

    const swap = function(arr, i, j) {
        let tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }

    for (let i = 0, j = arr.length - 1; i < j;) {
        if (!isVowel(arr[i])) {
            i++
            continue
        }
        if (!isVowel(arr[j])) {
            j--
            continue
        }
        swap(arr, i++, j--)
    }
    return arr.join('') 
};

const s = "IceCreAm"

const res = reverseVowels(s)
console.log(res)