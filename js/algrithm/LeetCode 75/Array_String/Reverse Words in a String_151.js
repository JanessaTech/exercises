var reverseWords = function(s) {
    return s.trim().split(/\s+/).reverse().join(' ')
};

const s = "the sky is blue"
const replaced = s.replace(/\s+/g, '-')
console.log(replaced)
const res = reverseWords(s)
console.log(res)