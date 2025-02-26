const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('SimpleDAO', function () {
    async function deploySimpleDAOFixture() {
        const [memA, memB, ...others] = await ethers.getSigners()
        const SimpleDAO = await ethers.getContractFactory('SimpleDAO')
        const simpleDAO = await SimpleDAO.deploy()
        return {simpleDAO, memA, memB}
    }

    describe('create & delete member', function () {
        it('it created a new member successfully', async function () {
            const {simpleDAO, memA} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createMember(memA)
            const newMember = await simpleDAO.getMember(memA.address)

            expect(newMember.addr).to.be.equal(memA.address)
        })
        it('it deleted the member successfully', async function () {
            const {simpleDAO, memA} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createMember(memA.address)
            await simpleDAO.deleteMember(memA.address)

            const nonMember = await simpleDAO.getMember(memA.address)
            expect(nonMember.addr).to.be.equal(ethers.ZeroAddress)
        })
    })

    describe('create & delete Proposal', function () {
        it('it created new proposals successfully', async function () {
            const {simpleDAO, memA} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createProposal('proposal1')
            await simpleDAO.createProposal('proposal2')

            const proposal = await simpleDAO.getProposal(1)
            expect(proposal.description).to.be.equal('proposal2')
        })
        it('it failed to delete a proposal when the id is invalid', async function () {
            const {simpleDAO, memA} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createProposal('proposal1')
            
            await expect(simpleDAO.deleteProposal(1)).to.be.revertedWith('invalid id')
        })
        it('it deleted proposal successfully', async function () {
            const {simpleDAO, memA} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createProposal('proposal1')
            await simpleDAO.createProposal('proposal2')
            await simpleDAO.createProposal('proposal3')

            await simpleDAO.deleteProposal(0)

            const proposal0= await simpleDAO.getProposal(0)
            const proposal1= await simpleDAO.getProposal(1)
            expect(proposal0.description).to.be.equal('proposal3')
            expect(proposal1.description).to.be.equal('proposal2')
        })
    })
    describe('vote', function () {
        it('it fails to vote when it is not registered as a member', async function () {
            const {simpleDAO, memA} = await loadFixture(deploySimpleDAOFixture)
            await expect(simpleDAO.vote(0, 20)).to.be.revertedWith('only valid member can vote')
        })
        it('it fails to vote  when it has not enough balance', async function () {
            const {simpleDAO, memB} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createMember(memB.address)
            await expect(simpleDAO.connect(memB).vote(0, 150)).to.be.revertedWith('not enough balance')
        })
        it('it fails to vote when the proposal id is invalid', async function () {
            const {simpleDAO, memB} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createMember(memB.address)
            await expect(simpleDAO.connect(memB).vote(0, 50)).to.be.revertedWith('invalid proposal id')
        })
        it('it voted successfully', async function () {
            const {simpleDAO, memB} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createMember(memB.address)
            await simpleDAO.createProposal('proposal0')
            await expect(simpleDAO.connect(memB).vote(0, 50)).to.emit(simpleDAO, 'Vote')
        })
        it('it failed to vote when the proposal is voted already', async function () {
            const {simpleDAO, memB} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createMember(memB.address)
            await simpleDAO.createProposal('proposal0')
            await simpleDAO.connect(memB).vote(0, 50)

            await expect(simpleDAO.connect(memB).vote(0, 50)).to.be.revertedWith('you already voted')
        })
        it('it failed to vote when the proposal is done', async function () {
            const {simpleDAO, memA, memB} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createMember(memA.address)
            await simpleDAO.createMember(memB.address)
            await simpleDAO.createProposal('proposal0')
            await simpleDAO.connect(memA).vote(0, 70)
            await simpleDAO.connect(memB).vote(0, 60)
          
            await simpleDAO.execute(0)
            await expect(simpleDAO.connect(memB).vote(0, 10)).to.be.revertedWith('it is already done')
        })
    })

    describe('execute', function () {
        it('it failed to execute the proposal when the proposal id is invalid', async function () {
            const {simpleDAO} = await loadFixture(deploySimpleDAOFixture)
            await expect(simpleDAO.execute(0)).to.be.revertedWith('invalid proposal id')
        })
        it('it failed to execute when the proposal is not approed by majority', async function () {
            const {simpleDAO, memA, memB} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createMember(memA.address)
            await simpleDAO.createMember(memB.address)
            await simpleDAO.createProposal('proposal0')
            await simpleDAO.connect(memA).vote(0, 30)
            await simpleDAO.connect(memB).vote(0, 50)

            await expect(simpleDAO.execute(0)).to.be.revertedWith('it is not approved by majority')
        })
        it('it execute the proposal successfully', async function () {
            const {simpleDAO, memA, memB} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createMember(memA.address)
            await simpleDAO.createMember(memB.address)
            await simpleDAO.createProposal('proposal0')
            await simpleDAO.connect(memA).vote(0, 70)
            await simpleDAO.connect(memB).vote(0, 50)

            await expect(simpleDAO.execute(0)).to.emit(simpleDAO, 'Execute')
        })
        it('it failed to execute when the proposal is already executed', async function () {
            const {simpleDAO, memA, memB} = await loadFixture(deploySimpleDAOFixture)
            await simpleDAO.createMember(memA.address)
            await simpleDAO.createMember(memB.address)
            await simpleDAO.createProposal('proposal0')
            await simpleDAO.connect(memA).vote(0, 70)
            await simpleDAO.connect(memB).vote(0, 50)

            await simpleDAO.execute(0)

            await expect(simpleDAO.execute(0)).to.be.revertedWith('it is executed')
        })
    })
})