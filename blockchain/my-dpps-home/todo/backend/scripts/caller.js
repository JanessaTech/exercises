/**
 * This is the experimental codes on how to interact with MyTodo.sol deployed on hardhat
 */

const { ethers } = require("ethers");

// Pls make sure hardhat is started on local listening at 8545
const  provider = new ethers.JsonRpcProvider();  // connect to http://localhost:8545 by default
// Make sure account1 exists in Hardhat when it is started. If not, update them accordingly
const account1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' // the first account given by local hardhat
const privateKey1 = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'  // the private key for account1
const contractAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3' // assume you have deployed the MyTodo.sol at this address （local hardhat）

const signer = new ethers.Wallet(privateKey1, provider)
const Todo = "(uint id, string title, string body, bool removed)"
const abi = [
    "function addTodo(uint _userId, string _title, string _body) public",
    `function getTodos(uint _userId) public view returns(${Todo}[])`,
    "function updateTodo(uint _userId, uint _id, string _title, string _body) public",
    "function checkTodoExist(uint _userId, uint _id) public view returns(bool)",
    "function deleteTodo(uint id) public"
]

const myTodoReadOnly = new ethers.Contract(contractAddr, abi, provider)
const myTodo = myTodoReadOnly.connect(signer)

const addTodo = async () => {
    const tx1 = await myTodo.addTodo(1, 'title1', 'todo1 content1')
    await tx1.wait()
    console.log(tx1)
    const tx2 = await myTodo.addTodo(1, 'title11', 'todo1 content12')
    console.log(tx2)
}

const getTodos = async (user) => {
    const res = await myTodoReadOnly.getTodos(user)
    console.log(res)
}

const updateTodo = async () => {
    const tx = await myTodo.updateTodo(1, 0, "title1 new", "todo1 content1 new")
    await tx.wait()
    console.log(tx)
}

const checkTodoExist  = async () => {
    const res = await myTodoReadOnly.checkTodoExist(1, 0)
    console.log(res)
}

const deleteTodo = async () => {
    const tx = await myTodo.deleteTodo(0);
    await tx.wait();
    console.log(tx)
}

//addTodo()
getTodos(1)
//updateTodo()
//checkTodoExist()
//deleteTodo()
