
function test1() {
    const ipfs = 'ipfs://bafybeic6qcadpqvxgx4oaaz4nywnhr7ba27e25nxni3uya3o7czyx57u74/product__1711543883438.jpg'
    const fileName = ipfs.substring(ipfs.indexOf('product__'))
    console.log("fileName =", fileName)
}

test1()