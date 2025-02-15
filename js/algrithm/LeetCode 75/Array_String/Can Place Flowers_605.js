var canPlaceFlowers = function(flowerbed, n) {
    let cnt = 0
    for (let i = 0; i < flowerbed.length  && cnt < n; i++) {
        if (flowerbed[i] === 1) continue
        const pre = i === 0 ? 0 : flowerbed[i - 1]
        const next = i === flowerbed.length - 1? 0: flowerbed[i + 1]
        if (pre === 0 && next === 0) {
            flowerbed[i] = 1
            cnt++
        }
    }
    return cnt === n
    
};