

const Seasons = Object.freeze({
    Summer: Symbol("summer"),
    Autumn: Symbol("autumn"),
    Winter: Symbol("winter"),
    Spring: Symbol("spring")
})
function  test1() {
    let season = Seasons.Spring

    switch (season) {
        case Seasons.Summer:
            console.log('the season is summer')
            break;
        case Seasons.Winter:
            console.log('the season is winter')
            break;
        case Seasons.Spring:
            console.log('the season is spring')
            break;
        case Seasons.Autumn:
            console.log('the season is autumn')
            break;
        default:
            console.log('season not defined')
    }

    console.log(season.description)
}

function test2() {
    const nftStatus = Object.freeze({
        On: Symbol("on"),
        Off: Symbol("off")
    })
    const res = Object.values(nftStatus).map((s) => s.description)
    console.log(res)

    const On1 = Symbol("on")
    const On2 = Symbol("on")
    console.log(On1.toString() === On2.toString())
    console.log(On1 === On2)
}

//test1()
test2()