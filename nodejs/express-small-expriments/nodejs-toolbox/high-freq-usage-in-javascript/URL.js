function test1({page, limit, sortBy}) {
    let query = {}
    if (page) {
        query.page = page
    }
    if (limit) {
        query.limit = limit
    }
    if (sortBy) {
        query.sortBy = sortBy
    }
    console.log(Object.entries(query))
    for (const [key, value] of Object.entries(query)) {
        //const [key, value] = q
        console.log('key = ', key, ' value = ', value)
    }
    const url = Object.entries(query).map((q) => {
        const [key, value] = q
        return `${key}=${value}`
    }).join('&')
    console.log('url = ', url)
}

function test2() {
    const aMap = new Map([['key1', 'value1'], ['key2', 'value2']])
    for (const [key, value] of aMap) {
        console.log('key = ', key, ' value = ', value)
    }
}

test1({page: 1, limit : 3, sortBy: 'chainId:desc'})
test1({limit : 3, sortBy: 'chainId:desc'})
test1({page: 1})
test1({})
//test1()
//test2()