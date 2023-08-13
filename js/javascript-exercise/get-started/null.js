var history  =  [
    new Array(9).fill(null)
]
let newStatus = history[history.length - 1].slice()
newStatus[0] = true

var newHistory = history.concat([newStatus])
console.log(newHistory)