const { expect } = require("chai");
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("MyVoting", function () {
    async function deployMyVotingFiveMinutesLockFixture() {
        const FIVE_MINS_IN_SECS = 5 * 60;
        const unlockTime = (await time.latest()) + FIVE_MINS_IN_SECS;

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const MyVoting = await ethers.getContractFactory('MyVoting');
        const myVoting = await MyVoting.deploy(unlockTime);
        return {myVoting, unlockTime, owner, otherAccount};
    }

    describe("deployment", function () {
        it("Should set the right unlockTime", async function () {
            const {myVoting, unlockTime} = await loadFixture(deployMyVotingFiveMinutesLockFixture);
            expect(await myVoting.unlockTime()).to.equal(unlockTime);
        })
        it("Should initiate 5 default candidates successfully", async function () {
            const {myVoting} = await loadFixture(deployMyVotingFiveMinutesLockFixture);
            const candidates = await myVoting.getCandidates();
            expect(candidates).to.be.an('array');
            expect(candidates).to.have.lengthOf(5);
            expect(candidates[0][1]).to.equal('Smith');
            expect(candidates[1][1]).to.equal('Janessa');
            expect(candidates[2][1]).to.equal('Miu Lees');
            expect(candidates[3][1]).to.equal('Johan Jin');
            expect(candidates[4][1]).to.equal('Sephine coco');
        })
        it("Should throw an error when unlockTime is before the block.timestamp", async function () {
            const latestTime = time.latest();
            const MyVoting = await ethers.getContractFactory('MyVoting');
            await expect(MyVoting.deploy(latestTime)).to.be.revertedWith('Unlock time should be in the future');  
        })
    })

    describe("register name", function () {
        it("Should register name successfully", async function () {
            const {myVoting} = await loadFixture(deployMyVotingFiveMinutesLockFixture);
            await myVoting.registerName('account1');
            const name = await myVoting.getRegisterName();
            expect(name).to.equal('account1');
        })
    })
    
    describe("getCandidate", function () {
        it("Should return a candidate by id 0", async function () {
            const {myVoting} = await loadFixture(deployMyVotingFiveMinutesLockFixture);
            const res = await myVoting.getCandidate(0);
            expect(res).to.have.ordered.members([0n, 'Smith', ''])
        })
        it('Should throw an error when get a candidate by the id which is out of index', async function () {
            const {myVoting} = await loadFixture(deployMyVotingFiveMinutesLockFixture);
            await expect(myVoting.getCandidate(10)).to.be.revertedWith("invalid id when calling getCandidate");
        })
    })

    describe("vote", function () {
        it("Should throw an error when the caller doesn't register his/her name", async function () {
            const {myVoting} = await loadFixture(deployMyVotingFiveMinutesLockFixture);
            await expect(myVoting.vote(0)).to.be.revertedWith("You must register name first");
        })
        it("Should throw an error when voting by an id which is out of index", async function () {
            const {myVoting} = await loadFixture(deployMyVotingFiveMinutesLockFixture);
            await myVoting.registerName('account1');
            await expect(myVoting.vote(10)).to.be.revertedWith("invalid id when voting");
        })
        it("Should throw an error when vote the candidate who is alreay voted", async function () {
            const {myVoting} = await loadFixture(deployMyVotingFiveMinutesLockFixture);
            await myVoting.registerName('account1');
            await myVoting.vote(0);
            await expect(myVoting.vote(0)).to.be.revertedWith("The candiate is already voted");
        })
        it("Should vote successfully", async function () {
            const {myVoting} = await loadFixture(deployMyVotingFiveMinutesLockFixture);
            await myVoting.registerName('account1');
            await myVoting.vote(0);
        })
    })
})