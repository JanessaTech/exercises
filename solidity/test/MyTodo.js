const { expect } = require("chai");
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('MyTodo', function () {
    async function deployMyTodoFixture() {
        const MyTodo = await ethers.getContractFactory("MyTodo");
        const mytodo = await MyTodo.deploy();
        return mytodo;
    }
    
    describe("addTodo", function () {
        it("it should create a new todo succesfully", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo("todo1", "body1")).not.to.be.reverted;
        })
        
    })
    describe("getTodos", function () {
        it("check result after adding a new todo, which should be successfully", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo("todo1", "body1")).not.to.be.reverted;
            const res = await mytodo.getTodos();
            expect(res).to.be.an("array").to.have.lengthOf(1);
            expect(res[0][0]).to.equal(0);
            expect(res[0][1]).to.equal("todo1");
            expect(res[0][2]).to.equal("body1");
            expect(res[0][3]).to.equal(false);
        })
    })
    describe("updateTodo", function () {
        it("it should update successfully when id is valid", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo("todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.updateTodo(0, "new todo", "new body")).not.to.be.reverted;
            const res = await mytodo.getTodos();
            expect(res).to.be.an("array").to.have.lengthOf(1);
            expect(res[0][0]).to.equal(0);
            expect(res[0][1]).to.equal("new todo");
            expect(res[0][2]).to.equal("new body");
            expect(res[0][3]).to.equal(false);
        })
        it("it should throw an error when update a to do using an invaid id", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo("todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.updateTodo(1, "new todo", "new body")).to.be.revertedWith("id is out of index")
        })
        it("it should throw an error when the to do we want to update is aleady deleted", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo("todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.deleteTodo(0)).not.to.be.reverted;
            await expect(mytodo.updateTodo(0, "new todo", "new body")).to.be.revertedWith("The todo is already removed")

        })
    })
    describe("deleteTodo", function () {
        it("it should be deleted successfully when id is valid", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo("todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.deleteTodo(0)).not.to.be.reverted;
            const res = await mytodo.getTodos();
            expect(res).to.be.an("array").to.have.lengthOf(1);
            expect(res[0][3]).to.equal(true);
        })
        it("it should throw an error when the to do want to delete is already deleted", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo("todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.deleteTodo(0)).not.to.be.reverted;
            await expect(mytodo.deleteTodo(0)).to.be.revertedWith("The todo is already removed")
        })
    })
})