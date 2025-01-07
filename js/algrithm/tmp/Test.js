const map = new Map()
map.set('a', 1)
map.set('b', 2)

map.forEach((v, k) => {
    console.log('value:', v, '  key:', k)
})