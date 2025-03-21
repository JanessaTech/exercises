const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const exp = require("constants");

describe('Voting', function () {
    async function deplyVotingFixture() {
        const [owner, nonOwner, bob, alice, ...others] = await ethers.getSigners()
        const Voting = await ethers.getContractFactory('Voting', owner)
        const names = ['Alic', 'Bob', 'Jane']
        const voting = await Voting.deploy(names)
        return {voting, names, owner, nonOwner, bob, alice}
    }
    describe('init', function () {
        it('init', async function () {
            const {voting, names} = await loadFixture(deplyVotingFixture)
            const candidates = await voting.getCandidates()
            expect(candidates.length).to.be.equal(names.length)
        })
    })
    describe('start', function () {
        it('it should fail to start when it is not owner', async function (){
            const {voting, nonOwner} = await loadFixture(deplyVotingFixture)
            await expect(voting.connect(nonOwner).start()).to.be.revertedWith('not owner')
        })
        it('it should start successfully', async function () {
            const {voting} = await loadFixture(deplyVotingFixture)
            await voting.start()
            const isStarted = await voting.isStarted()
            expect(isStarted).to.be.equal(true)
        })
        it('it should fail to start when it is started already', async function () {
            const {voting}  = await loadFixture(deplyVotingFixture)
            await voting.start()
            await expect(voting.start()).to.be.revertedWith('started')
        }) 
    })
    describe('end', function () {
        it('it should fail to end when it is not owner', async function () {
            const {voting, nonOwner}  = await loadFixture(deplyVotingFixture)
            await expect(voting.connect(nonOwner).end()).to.be.revertedWith('not owner')
        })
        it('it should fail to end when it is not started', async function () {
            const {voting} = await loadFixture(deplyVotingFixture)
            await expect(voting.end()).to.be.revertedWith('not started')
        })
        it('it should end successfully', async function () {
            const {voting} = await loadFixture(deplyVotingFixture)
            await voting.start()
            await voting.end()
            const isEnded  = await voting.isEnded()
            expect(isEnded).to.be.equal(true)
        })
        it('it should fail to end when it is ended already', async function () {
            const {voting} = await loadFixture(deplyVotingFixture)
            await voting.start()
            await voting.end()
            await expect(voting.end()).to.be.revertedWith('ended')
        })
    })
    describe('vote', function () {
        it('it should fail to vote when the voting is not started', async function () {
            const {voting, bob} = await loadFixture(deplyVotingFixture)
            await expect(voting.connect(bob).vote(1)).to.be.revertedWith('Not started')
        })
        it('it should fail to vote when the voting is ended already', async function () {
            const {voting, bob} = await loadFixture(deplyVotingFixture)
            await voting.start()
            await voting.end()
            await expect(voting.connect(bob).vote(1)).to.be.revertedWith('ended')
        })
        it('it should fail to vote when the id is invalid', async function () {
            const {voting, bob} = await loadFixture(deplyVotingFixture)
            await voting.start()
            await expect(voting.connect(bob).vote(3)).to.be.revertedWith('invalid id')
        })
        it('it should fail to vote when the candidate is already voted', async function () {
            const {voting, bob} = await loadFixture(deplyVotingFixture)
            await voting.start()
            await voting.connect(bob).vote(1)
            await expect(voting.connect(bob).vote(1)).to.be.revertedWith('already voted')
        })
        it('it should vote successfully', async function () {
            const {voting, bob} = await loadFixture(deplyVotingFixture)
            await voting.start()
            await expect(voting.connect(bob).vote(1)).to.emit(voting, 'Vote').withArgs(bob.address, 1)
        })
    })
    describe('unvote', function () {
        it('it should fail to unvote when the voting is not started', async function () {
            const {voting, bob} = await loadFixture(deplyVotingFixture)
            await expect(voting.connect(bob).unvote(1)).to.be.revertedWith('Not started')
        })
        it('it should fail to unvote when the voting is ended already', async function () {
            const {voting, bob} = await loadFixture(deplyVotingFixture)
            await voting.start()
            await voting.end()
            await expect(voting.connect(bob).unvote(1)).to.be.revertedWith('ended')
        })
        it('it should fail to vote when the id is invalid', async function () {
            const {voting, bob} = await loadFixture(deplyVotingFixture)
            await voting.start()
            await expect(voting.connect(bob).unvote(3)).to.be.revertedWith('invalid id')
        })
        it('it should fail to unvote when it is not voted', async function () {
            const {voting, bob} = await loadFixture(deplyVotingFixture)
            await voting.start()
            await expect(voting.connect(bob).unvote(1)).to.be.revertedWith('not allow to unvote')
        })
        it('it should fail to unvote when the voter is not itself', async function () {
            const {voting, bob, alice} = await loadFixture(deplyVotingFixture)
            await voting.start()
            await voting.connect(bob).vote(1)
            await expect(voting.connect(alice).unvote(1)).to.be.revertedWith('not allow to unvote')
        })
        it('it should unvote successfully', async function () {
            const {voting, bob, alice} = await loadFixture(deplyVotingFixture)
            await voting.start()
            await voting.connect(bob).vote(1)
            await expect(voting.connect(bob).unvote(1)).to.emit(voting, 'Unvote').withArgs(bob.address, 1)
        })
    })
})