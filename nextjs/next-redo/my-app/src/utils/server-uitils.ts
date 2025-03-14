import "server-only"
export  const serverSideFunction = () => {
    console.log(
        `use multiple libs
        interact with database
        process confidential information etc`
    )
    return 'server result'
}