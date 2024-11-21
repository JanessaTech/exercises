const move = function(seq, k, dir) {
    const slots = seq.split('').map((v) => parseInt(v))
    if (dir === -1) {
        slots[k] =  (slots[k] - 1 + 10) % 10
    } else {
        slots[k] = (slots[k] + 1) % 10
    }
    return slots.join('')
}

const num = '0000'
const back = move(num, 0, -1)
const forward = move(num, 0, 1)
console.log('back:', back)
console.log('forward:', forward)

 
