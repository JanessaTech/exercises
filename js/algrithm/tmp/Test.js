const map = new Map()
map.set('a', [])
map.get('a').push(1)
map.get('a').push(2)
console.log(map)
map.forEach((value, key) => {
    console.log('key = ', key)
    console.log('value = ', value)
})