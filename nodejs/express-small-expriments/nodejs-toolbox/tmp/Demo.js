const {data} =  require('./data')



function  test1() {

    const res = data.find(e => e.id === 1)
    res.age=20
    console.log(res)
    console.log(data)
    console.log(!![])
}

function test2() {
    const arr = [1, 2, 3, 4, 5, 6]
    arr.push(7)
    console.log(arr.toString())
}

class CustomError extends Error {
    constructor(props) {
        super();
        this.message = 'vvvvvvvvvvvv'
    }
}

function  test3() {
    function isJson(obj) {
        return obj !== undefined && obj !== null && obj.constructor === Object;
    }
    const args = [ 1, [2, 3], true, 'sss', null, undefined, { name: 'John' }, 'aaa', new CustomError('xxxxxx')]
    const res = args.map( e => isJson(e) ? '\n' + JSON.stringify(e, null, 4) + '\n' : e).join(' ')
    console.log(res)
    args.forEach(e => console.log(isJson(e)))
    args.forEach(e => console.log(e ? e.constructor : e))
}

function test4() {
    const id = 1
    const chainId = 2
    const address = 'some-address'
    const tokenId = 3
    const nft = {id: id, chainId: chainId, address: address, tokenId: tokenId, toJSON: () => { return { id: id, chainId: chainId, address: address, tokenId: tokenId}}}
    console.log(nft.toJSON())
}

function test5() {
    const sortBy = 'chainId:asc,tokenId:desc'
    const sorts = {}
    sortBy.split(',').forEach((sort) => {
        const [key, order] = sort.split(':')
        sorts[key] = order === 'asc' ? 1 : -1
    })
    const sortingCriteria = {sortBy : sorts}
    console.log(sortingCriteria)
}

function test6() {
    const ipfs = 'ipfs://bafybeics4gipwcek5rzkyfs7t2cptkodoqeguf2ttv4ers7sr4g642tj6q'
    //const gateway = 'http://localhost:8080'  // https://nftstorage.link
    const gateway = 'https://nftstorage.link'
    const cid = ipfs.substring('ipfs://'.length)
    console.log('cid = ', cid)
    const [protocol, domain] = gateway.split('://')
    console.log('protocol = ', protocol , ' domain = ', domain)
    const url = `${protocol}://${cid}.ipfs.${domain}`
    console.log(' url = ', url)
}

function test7() {
    const options_populate = 'userId:id name,replies:id userId:userId|id name createdAt'
    if (options_populate) {
        options_populate.split(',').forEach((populateOption) => {
            const [path, select, subPopulate] = populateOption.split(':')
            const popOptions = {path: path, select: path}
            if (subPopulate) {
                const [subPath, subSelect] = subPopulate.split('|')
                popOptions.populate = {path: subPath, select: subSelect}
            }
            console.log('paginate.populate. path =', path, ',select =', select, ',population =', subPopulate)

        });
        /*docsPromise = docsPromise.populate(
          {path: 'userId', select: 'id name createdAt'}
        );
        docsPromise = docsPromise.populate(
          {path: 'replies', select: 'id userId',  populate: { path: 'userId', select: 'id name createdAt'}}
        );*/
    }
}

function test8() {
    const sortBy = 'chainId:asc,address:desc,tokenId:asc'
    const columns = ['chainId','address','tokenId']
    if (sortBy) {
        const sortOptions = sortBy.split(',')
        for (const sortOption of sortOptions) {
            const [key, order] = sortOption.split(':')
            if (!order) {
                return false
            }
            if (!columns.includes(key)) {
                return false
            }
            if (!['asc', 'desc'].includes(order)){
                return false
            }
        }
    }
    return true
}

function test9() {
    const [key, order] = 'chainId-asc'.split(':')
    console.log('key = ', key, ' order = ', order)
    const columns = ['chainId','address','tokenId']
    console.log(columns.includes('chainI'))
    console.log(`${columns}`)

}

//test2()
//test3()
//test4()
//test5()
//test6()
//test7()
//console.log(test8())
test9()
