const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

/*
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Redo {
    struct Person {
        uint id;
        string name;
    }
    uint idx;
    Person[] persons;
    mapping(uint => uint) idxMapping;
    mapping(uint => bool) inserted;

    function create(string memory _name) public {
        uint _id = idx;
        idx++;
        persons.push(Person({id: _id, name: _name}));
        idxMapping[_id] = persons.length - 1;
        inserted[_id] = true;
    }

    function remove(uint _id) public {
        require(inserted[_id], 'invalid id');
        uint _idx = idxMapping[_id];
        Person storage last = persons[persons.length - 1];
        persons[_idx] = Person({id: last.id, name: last.name});
        idxMapping[last.id] = _idx;
        delete idxMapping[_id];
        delete inserted[_id];
        persons.pop();
    }

    function getAll() public view returns (Person[] memory) {
        return persons;
    }

    function get(uint _id) public view 
        returns(uint id,
            string memory name) {
            require(inserted[_id], 'invalid id');
            Person storage person = persons[idxMapping[_id]];
            return (person.id, person.name);
    }
}*/

describe('Redo', function () {
    async function deployRedoFixture() {
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        return {redo}
    }
    describe('test', function () {
        it('create & delete', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.create('Jane0')
            await redo.create('Jane1')
            await redo.create('Jane2')
            await redo.remove(1)
            await redo.create('Jane3')
            await redo.create('Jane4')
            await redo.remove(3)

            const person0 = await redo.get(0)
            const person2 = await redo.get(2)
            const person4 = await redo.get(4)
            const persons = await redo.getAll()
            expect(persons.length).to.be.equal(3)
            expect(person0.name).to.be.equal('Jane0')
            expect(person2.name).to.be.equal('Jane2')
            expect(person4.name).to.be.equal('Jane4')
            await expect(redo.get(1)).to.be.revertedWith('invalid id')
            await expect(redo.get(3)).to.be.revertedWith('invalid id')
        })
    })
}) 
/*
    describe('Redo', function () {
        async function deployRedoFixture() {
            const Redo = await ethers.getContractFactory('Redo')
            const redo = await Redo.deploy()
            return {redo}
        }

        describe('test', function () {
            
        })
    })

*/


