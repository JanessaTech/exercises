

// test how to print pretty json format
function test() {
    const json_str = [{"name":"userA","email":"userA@google.com","refereals":[{"name":"userB","email":"userB@google.com","referedBy":"682596788b01ab8e020132fd","id":"682596788b01ab8e02013300"},{"name":"userC","email":"userC@google.com","referedBy":"682596788b01ab8e020132fd","id":"682596788b01ab8e02013301"},{"name":"userD","email":"userD@google.com","referedBy":"682596788b01ab8e020132fd","id":"682596788b01ab8e02013302"}],"id":"682596788b01ab8e020132fd"}]
    console.log(JSON.stringify(json_str, null, 2))
}

test()