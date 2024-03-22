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

function forTest1() {
    test1({page: 1, limit : 3, sortBy: 'chainId:desc'})
    test1({limit : 3, sortBy: 'chainId:desc'})
    test1({page: 1})
    test1({})
}

function getQuery({page, limit, sortBy, chainId, category, prices}) {
    let queryOptions = {}
    if (page) {
        queryOptions.page = page
    }
    if (limit) {
        queryOptions.limit = limit
    }
    if (sortBy) {
        queryOptions.sortBy = sortBy
    }
    if (chainId) {
        queryOptions.chainId = chainId
    }
    if (category && category.length > 0) {
        queryOptions.category = category
    }
    if (prices) {
        queryOptions.prices = prices
    }
    return Object.entries(queryOptions).map((q) => {
        const [key, value] = q
        if (key === 'category') {
            const cats = []
            for (const cat of value) {
                cats.push(`category[]=${cat}`)
            }
            return cats.join('&')
        } else if (key === 'prices') {
            return `prices=min:${value.min}|max:${value.max}`
        } else {
            return `${key}=${value}`
        }
    }).join('&')
}

function test3() {
    const case1 = {page: 1, limit : 10, sortBy: 'id:desc', chainId: 31337, category: ['books', 'pets'], prices: {min:0, max:100}}
    const q1  = getQuery(case1)
    console.log(q1)

    const case2 = {page: 1, limit : 10, sortBy: 'id:desc', chainId: 31337, category: [], prices: {min:0, max:100}}
    const q2  = getQuery(case2)
    console.log(q2)

    const case3 = {page: 1, limit : 10, sortBy: 'id:desc', chainId: 31337, prices: {min:0, max:100}}
    const q3  = getQuery(case3)
    console.log(q3)

    const case4 = {page: 1, limit : 10, sortBy: 'id:desc', chainId: 31337}
    const q4  = getQuery(case4)
    console.log(q4)

    const case5 = {page: 1, limit : 10, sortBy: 'id:desc'}
    const q5  = getQuery(case5)
    console.log(q5)

    const case6 = {page: 1, limit : 10}
    const q6  = getQuery(case6)
    console.log(q6)

    const case7 = {page: 1}
    const q7  = getQuery(case7)
    console.log(q7)

    const case8 = {}
    const q8  = getQuery(case8)
    console.log('q8 = ', q8)
}


//test1()
//test2()
//forTest1()
test3()