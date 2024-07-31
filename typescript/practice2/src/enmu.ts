
enum Season {
    Spring,
    Summmer,
    South,
    Winter
}

let enmu1 = Season.Summmer
let enmu2 = Season.Winter

let season = Season.Spring
console.log(enmu1 as Season === Season.Winter)
console.log(enmu1 as Season === enmu2 as Season)