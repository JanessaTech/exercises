    const arr = [['bar', 1], ['bar2', 4]]

    const timestamp = 5
    var lo = 0
    var hi = arr.length - 1
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (arr[mid][1] === timestamp) {
            return arr[mid][0]
        } else if (arr[mid][1] > timestamp) {
            hi = mid - 1
        } else {
            lo = mid + 1
        }
    }
    if (hi < 0 ) {
        console.log('empty')
    } else if (lo >= arr.length) {
        console.log('empty')
    } else {
        console.log(arr[hi][0])
        //return arr[hi][0]
    }

    console.log('lo = ', lo)
    console.log('hi = ', hi)
