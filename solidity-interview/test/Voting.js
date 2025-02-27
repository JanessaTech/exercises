const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('Voting', function () {
    async function deployVottingFixture() {
        const [owner, nonOwner, userA, userB, userC, userD, ...others] = await ethers.getSigners()
        const Voting = await ethers.getContractFactory('Voting', owner)
        const One_week_in_secs = 60 * 60 * 24 * 7;
        const One_day_in_secs = 60 * 60 * 24 * 1;
        const voting = await Voting.deploy(One_week_in_secs)
        return {voting, owner, nonOwner, userA, userB, userC, userD, One_day_in_secs, One_week_in_secs}
    }

    describe('init', function () {
        it('init', async function () {
            const {voting} = await loadFixture(deployVottingFixture)
            const started  = await voting.checkStarted()
            const ended = await voting.checkEnded()
            expect(started).to.be.equal(false)
            expect(ended).to.be.equal(false)
        })
    })
    describe('start', function () {
        it('it failed to start when it is not owner', async function () {
            const {voting, nonOwner} = await loadFixture(deployVottingFixture)
            await expect(voting.connect(nonOwner).start()).to.be.revertedWith('not owner')
        })
        it('it started successfully', async function () {
            const {voting} = await loadFixture(deployVottingFixture)
            await expect(voting.start()).to.emit(voting, 'Start')
        })
        it('it failed to start when it is already started', async function () {
            const {voting} = await loadFixture(deployVottingFixture)
            await voting.start()
            await expect(voting.start()).to.be.revertedWith('already started')
        })
    })

    describe('end', function () {
        it('it failed to end when it is not owner', async function () {
            const {voting, nonOwner} = await loadFixture(deployVottingFixture)
            await expect(voting.connect(nonOwner).end()).to.be.revertedWith('not owner')
        })
        it('it failed to end when it is not expired', async function () {
            const {voting, One_day_in_secs} = await loadFixture(deployVottingFixture)
            await voting.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + One_day_in_secs)

            await expect(voting.end()).to.be.revertedWith('not ended')
        })
        it('it ended successfully', async function () {
            const {voting, One_week_in_secs}  = await loadFixture(deployVottingFixture)
            await voting.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + One_week_in_secs)

            await expect(voting.end()).to.emit(voting, 'End')
        })
        it('it failed to end when it is already ended', async function () {
            const {voting, One_week_in_secs}  = await loadFixture(deployVottingFixture)
            await voting.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + One_week_in_secs)
            await voting.end()

            await expect(voting.end()).to.be.revertedWith('already ended')
        })
    })

    describe('createCandidate', function () {
        it('it failed to create a new candidate when it is not owner', async function () {
            const {voting, nonOwner} = await loadFixture(deployVottingFixture)
            await expect(voting.connect(nonOwner).createCandidate('candidate1')).to.be.revertedWith('not owner')
        })
        it('it failed to create a new candiate when it is started', async function () {
            const {voting} = await loadFixture(deployVottingFixture)
            await voting.start()

            await expect(voting.createCandidate('candidate1')).to.be.revertedWith('started')
        })
        it('it created a new candidate succesfully', async function() {
            const {voting} = await loadFixture(deployVottingFixture)

            await expect(voting.createCandidate('candidate1')).to.emit(voting, 'CreateCandidate')
            const candidates = await voting.getAllCandidates()
            expect(candidates.length).to.be.equal(1)
            expect(candidates[0][1]).to.be.equal('candidate1')
        })
    })

    describe('removeCandidate', function () {
        it('it failed to remove candidate when it is not owner', async function () {
            const {voting, nonOwner} = await loadFixture(deployVottingFixture)

            await expect(voting.connect(nonOwner).removeCandidate(1)).to.be.revertedWith('not owner')
        })
        it ('it failed to remove candidate when it is started', async function () {
            const {voting} = await loadFixture(deployVottingFixture)
            await voting.start()

            await expect(voting.removeCandidate(1)).to.be.revertedWith('started')
        })
        it ('it failed to remove candiate when it is an invalid candidate', async function () {
            const {voting} = await loadFixture(deployVottingFixture)
            await expect(voting.removeCandidate(1)).to.be.revertedWith('invalid candidate')
        })
        it ('it removed the candidate successfully', async function () {
            const {voting} = await loadFixture(deployVottingFixture)
            await voting.createCandidate('candidate0')
            await voting.createCandidate('candidate1')

            await expect(voting.removeCandidate(0)).to.emit(voting, 'RemoveCandidate')
            const candidate = await voting.getCandidate(1)
            expect(candidate.name).to.be.equal('candidate1')
        })
        it('it removed mutiple candidates successfully', async function () {
            const {voting} = await loadFixture(deployVottingFixture)
            await voting.createCandidate('candidate0')
            await voting.createCandidate('candidate1')
            await voting.createCandidate('candidate2')
            await voting.createCandidate('candidate3')

            await voting.removeCandidate(1)
            await voting.removeCandidate(3)

            const candidate0 = await voting.getCandidate(0)
            const candidate2 = await voting.getCandidate(2)

            expect(candidate0.name).to.be.equal('candidate0')
            expect(candidate2.name).to.be.equal('candidate2')
            await expect(voting.getCandidate(1)).to.be.revertedWith('invalid id')
            await expect(voting.getCandidate(3)).to.be.revertedWith('invalid id')
        })
    })

    describe('vote', function () {
        it('it failed to vote when it is not started', async function () {
            const {voting, userA} = await loadFixture(deployVottingFixture)
            await expect(voting.connect(userA).vote(1)).to.be.revertedWith('not started')
        })
        it('it failed to vote when it is ended', async function () {
            const {voting, userA, One_week_in_secs} = await loadFixture(deployVottingFixture)
            await voting.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + One_week_in_secs)

            await expect(voting.connect(userA).vote(1)).to.be.revertedWith('ended')
        })
        it('it failed to vote when the candidate is invalid', async function () {
            const {voting, userA} = await loadFixture(deployVottingFixture)
            await voting.start()

            await expect(voting.connect(userA).vote(1)).to.be.revertedWith('invalid id')
        })
        it('it voted successfully', async function () {
            const {voting, userA} = await loadFixture(deployVottingFixture)
            await voting.createCandidate('candidate0')
            await voting.createCandidate('candidate1')
            await voting.createCandidate('candidate2')
            await voting.start()

            await expect(voting.connect(userA).vote(1)).to.emit(voting, 'Vote').withArgs(userA.address, 1)
        })
        it('it failed to vote when you already voted', async function () {
            const {voting, userA} = await loadFixture(deployVottingFixture)
            await voting.createCandidate('candidate0')
            await voting.createCandidate('candidate1')
            await voting.createCandidate('candidate2')
            await voting.start()
            await voting.connect(userA).vote(1)

            await expect(voting.connect(userA).vote(1)).to.be.revertedWith('you voted')
        })
        it('it failed to vote when teh candidate is voted already', async function () {
            const {voting, userA, userB} = await loadFixture(deployVottingFixture)
            await voting.createCandidate('candidate0')
            await voting.createCandidate('candidate1')
            await voting.createCandidate('candidate2')
            await voting.start()
            await voting.connect(userA).vote(1)

            await expect(voting.connect(userB).vote(1)).to.be.revertedWith('candidated is voted')
        })
    })

    describe('unvote', function () {
        it('it failed to unvote when it is not started', async function () {
            const {voting, userA} = await loadFixture(deployVottingFixture)
            await expect(voting.connect(userA).unvote(1)).to.be.revertedWith('not started')
        })
        it('it failed to unvote when it is ended', async function () {
            const {voting, userA, One_week_in_secs} = await loadFixture(deployVottingFixture)
            await voting.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + One_week_in_secs)

            await expect(voting.unvote(1)).to.be.revertedWith('ended')
        })
        it('it failed to unvote when the candidate is invalid', async function () {
            const {voting, userA} = await loadFixture(deployVottingFixture)
            await voting.start()
            
            await expect(voting.connect(userA).vote(1)).to.be.revertedWith('invalid id')
        })
        it('it failed to unvote when you did not vote it', async function () {
            const {voting, userA} = await loadFixture(deployVottingFixture)
            await voting.createCandidate('candidate0')
            await voting.createCandidate('candidate1')
            await voting.createCandidate('candidate2')
            await voting.start()

            await expect(voting.connect(userA).unvote(1)).to.be.revertedWith('you did not vote')
        })
        it('it unvote successfully', async function () {
            const {voting, userA} = await loadFixture(deployVottingFixture)
            await voting.createCandidate('candidate0')
            await voting.createCandidate('candidate1')
            await voting.createCandidate('candidate2')
            await voting.start()
            await voting.connect(userA).vote(1)

            await expect(voting.connect(userA).unvote(1)).to.emit(voting, 'Unvote')
            const candidate = await voting.getCandidate(1)
            expect(candidate.voted).to.be.equal(false)
        })
    })
})