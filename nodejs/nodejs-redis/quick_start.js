const { createClient } = require('redis')

function connect_redis() {
    const client = createClient({
        url: 'redis://:redis@192.168.0.102:6379'
    })
    client.on('connect', function() { console.log('Redis server is connected!');});
    client.on('error', err => console.log('Redis Client Error', err));
    
    client.connect();
    return client
}


async function write_read_redis_basic() {
    const client = connect_redis()
    //await client.set('myname', 'JanessaTech');
    //await client.set('myname', 'JanessaTech1');
     client.set('myname', 'JanessaTech');
     client.set('myname', 'JanessaTech1');
    //await client.del('myname')
    const myname =  await client.get('myname');
    console.log('myname =', myname)
}

async function write_read_complex() {
    const client = connect_redis()
    //await client.hSet('frameworks_hash', 'javascript', 'ReactJS')
    //await client.hSet('frameworks_hash', 'css', 'TailwindCSS')
    //await client.hSet('frameworks_hash', {'node': 'Express', 'javascript': 'ReactJS', 'css':'TailwindCSS'})
    await client.hSet('frameworks_hash', {node: 'Express', javascript: 'ReactJS', css:'TailwindCSS'})
    //const exist = await client.hExists('frameworks_hash', 'javascript')
    //console.log('exist = ', exist)
    //await client.hDel('frameworks_hash', 'javascript')

}

async function read_redis() {
    const client = connect_redis()
    const value = await client.hGet('frameworks_hash', 'node1')
    console.log('value =', value)
}

async function warmup() {
    const client = connect_redis()
    /*
    const all_tokenIds = [0, 1, 2, 3]
    await client.hSet('0x5FbDB2315678afecb367f032d93F642f64180aa3', {all_tokenids: all_tokenIds.join(',')})
    const ids = await client.hGet('0x5FbDB2315678afecb367f032d93F642f64180aa3', 'all_tokenids')
    console.log('ids =', ids)*/

    /*await client.hSet('0x5FbDB2315678afecb367f032d93F642f64180aa3', {uri_0: 'ipfs://bafybeidlh3f6uxtkhv74gddtl3n7wjx4xo6tgumlxaw3zljwrzy57wosxe'})
    await client.hSet('0x5FbDB2315678afecb367f032d93F642f64180aa3', {owner_0:  '0xb129c8aD40e31bC421F37b5B418CF1Bfe1175536'})
    const uri = await client.hGet('0x5FbDB2315678afecb367f032d93F642f64180aa3', 'uri_0')
    const owner = await client.hGet('0x5FbDB2315678afecb367f032d93F642f64180aa3', 'owner_0')
    console.log('uri =', uri)
    console.log('owner =', owner)*/

    // await client.hDel('0x5FbDB2315678afecb367f032d93F642f64180aa3', 'uri_0')
    // const uri = await client.hGet('0x5FbDB2315678afecb367f032d93F642f64180aa3', 'uri_0')
    // console.log('uri =', uri)

    // await client.hSet('0x5FbDB2315678afecb367f032d93F642f64180aa3', {owner_0:  '0xb129c8aD40e31bC421F37b5B418CF1Bfe1175536'})
    // await client.hSet('0x5FbDB2315678afecb367f032d93F642f64180aa3', {owner_0:  '0xb129c8aD40e31bC421F37b5B418CF1Bfe1175555'})
    // const owner = await client.hGet('0x5FbDB2315678afecb367f032d93F642f64180aa3', 'owner_0')
    // console.log('owner =', owner)

    await client.hSet('0x5FbDB2315678afecb367f032d93F642f64180aa3', {all_tokenids: ''})
    await client.hDel('0x5FbDB2315678afecb367f032d93F642f64180aa3', 'all_tokenids')
    const ids = await client.hGet('0x5FbDB2315678afecb367f032d93F642f64180aa3', 'all_tokenids')
    const idArray = ids.split(',')
    const data = Number('')
    console.log('data =', data)
    console.log('ids =', ids.split(',').map((id) => Number(id)))
}

//write_read_redis_basic()
//write_read_complex()
//read_redis()
warmup()


