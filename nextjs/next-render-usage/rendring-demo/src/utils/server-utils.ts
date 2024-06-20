import "server-only"
export const serverSideFunction = () => {
    console.log(`
    use multiple libs
    use enviroment variables
    interact with a database
    process confidential info
    `)
    return 'server result'
}