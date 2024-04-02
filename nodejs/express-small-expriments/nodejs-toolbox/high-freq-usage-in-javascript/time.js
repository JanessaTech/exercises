

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}
function test1() {
    let date = new Date()
    console.log(date)
    console.log(formatDate(date))

}

const monthMap = new Map([
    [0, 'Jan'],
    [1, 'Feb'],
    [2, 'Mar'],
    [3, 'Apr'],
    [4, 'May'],
    [5, 'Jun'],
    [6, 'Jul'],
    [7, 'Aug'],
    [8, 'Sep'],
    [9, 'Oct'],
    [10, 'Nov'],
    [11, 'Dec']
])
function shortFormatDate(date) {
    return `${monthMap.get(date.getMonth())} ${date.getDate()}th,${date.getFullYear()}`
}
function test2() {
    let date = new Date('2024-03-17T02:10:07.336Z')
    console.log(date)
    console.log(shortFormatDate(date))
}


async function time_duration() {
    let startTime = performance.now()
    await new Promise(r => setTimeout(r, 2000))
    let endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
}
//test1()
//test2()
time_duration().then(() => console.log('done')
)