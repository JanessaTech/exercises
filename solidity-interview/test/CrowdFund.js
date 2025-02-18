const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('CrowdFund', function () {
    async function deployCrowdFundFixture() {
        const [tokenOwner, crowdFundOwner, campaignOwner1, campaignOwner2, userA, userB, userC,...others] = await ethers.getSigners()
        const MyERC20 = await ethers.getContractFactory('MyERC20', tokenOwner)
        const erc20 = await MyERC20.deploy('myerc20', 'FUND')
        const initBalance = 1000
        await erc20.transfer(userA.address, initBalance)
        await erc20.transfer(userB.address, initBalance)
        await erc20.transfer(userC.address, initBalance)
        const CrowdFund = await ethers.getContractFactory('CrowdFund', crowdFundOwner)
        const crowdFund = await CrowdFund.deploy(erc20.getAddress())
        await erc20.connect(userA).approve(crowdFund.getAddress(), initBalance)
        await erc20.connect(userB).approve(crowdFund.getAddress(), initBalance)
        await erc20.connect(userC).approve(crowdFund.getAddress(), initBalance)
        const latestTime = await time.latest()
        const ONE_DAY_IN_SECS = 60 * 60 * 24
        const ONE_WEEK_IN_SECS = 60 * 60 * 24 * 7
        const goal = 3000
        return {crowdFund, erc20, initBalance, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, campaignOwner2, userA, userB, userC}
    }
    describe('init', function () {
        it('It should init successfully', async function () {
            const {crowdFund} = await loadFixture(deployCrowdFundFixture)
        })
    })

    describe('createCampaign', function () {
        it('It should fail to create a campaign when start > end', async function () {
            const {crowdFund, latestTime, ONE_WEEK_IN_SECS, goal} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime
            const end = start - ONE_WEEK_IN_SECS
            await expect(crowdFund.createCampaign(start, end, goal)).to.be.revertedWith('start >= end when create a new campaign')
        })
        it('It fails to create a new campaign when start < block.timestamp ', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime - ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await expect(crowdFund.createCampaign(start, end, goal)).to.be.revertedWith('start < block.timestamp when create a new campaign')
        })
        it('It created a new campaign successfully', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await expect(crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)).to.emit(crowdFund, 'CreateCampaign')
        })
    })

    describe('cancelCampaign', function () {
        it('It fails to cancel campaign when it does not exist', async function () {
            const {crowdFund} = await loadFixture(deployCrowdFundFixture)
            await expect(crowdFund.cancelCampaign(1)).to.be.revertedWith('campaign does not exist')
        })
        it('It fails to cancel campaign when it is not owner', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, campaignOwner2} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await expect(crowdFund.connect(campaignOwner2).cancelCampaign(0)).to.be.revertedWith('not owner')
        })
        it('It fails to cancel campain vwhen it is already started', async function (){
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(start + ONE_DAY_IN_SECS)
            await expect(crowdFund.connect(campaignOwner1).cancelCampaign(0)).to.be.revertedWith('campaign is already started')
        })
        it('It canceled the campaign successfully', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await expect(crowdFund.connect(campaignOwner1).cancelCampaign(0)).to.emit(crowdFund, 'CancelCampaign')
        })
    })
    describe('pledge', function () {
        it('It fails to pledge when the campaign does not exist', async function () {
            const {crowdFund} = await loadFixture(deployCrowdFundFixture)
            const _amount = 500
            await expect(crowdFund.pledge(1, _amount)).to.be.revertedWith('campaign does not exist')
        })
        it('It fails to pledge when the campaign is not started', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            const _amount = 500
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await expect(crowdFund.connect(userA).pledge(0, _amount)).to.be.revertedWith('campaign is not started')
        })
        it('It fails to plege when the campagin is ended', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            const _amount = 500
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(end)
            await expect(crowdFund.connect(userA).pledge(0, _amount)).to.be.revertedWith('campaign is ended')
        })
        it('It fails to plege when the campagin is cancelled', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            const _amount = 500
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await crowdFund.connect(campaignOwner1).cancelCampaign(0)
            await time.increaseTo(start)
            await expect(crowdFund.connect(userA).pledge(0, _amount)).to.be.revertedWith('campaign is cancelled')
        })
        it('It should pledge successfully', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            const _amount = 500
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(start)

            await expect(crowdFund.connect(userA).pledge(0, _amount)).to.emit(crowdFund, 'PledgeCampaign')
            const campaign = await crowdFund.getCampaign(0)
            expect(campaign[4]).to.be.equal(500)
        })
    })
    describe('unpledge', function () {
        it('It fails to unpledge when the campaign does not exist', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            const _amount = 500
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(start)
            await crowdFund.connect(userA).pledge(0, _amount)

            const unpledge_amount = 300
            await expect(crowdFund.connect(campaignOwner1).unpledge(1, unpledge_amount)).to.be.revertedWith('campaign does not exist')
        })
        it('it fails to unpledge when the campaign is ended', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            const _amount = 500
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(start)
            await crowdFund.connect(userA).pledge(0, _amount)

            const unpledge_amount = 300
            await time.increaseTo(end)
            await expect(crowdFund.connect(userA).unpledge(0, unpledge_amount)).to.be.revertedWith('campaign is ended')
        })
        it('It fails to unpledge when the amount is too large', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, campaignOwner2, userA} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            const _amount = 500
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(start)
            await crowdFund.connect(userA).pledge(0, _amount)

            const unpledge_amount = 800
            await expect(crowdFund.connect(userA).unpledge(0, unpledge_amount)).to.be.revertedWith('unpledge too much amount')
        })
        it('it unpledged successfully', async function () {
            const {crowdFund, erc20, initBalance, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, campaignOwner2, userA} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            const _amount = 500
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(start)
            await crowdFund.connect(userA).pledge(0, _amount)

            const unpledge_amount = 300
            await crowdFund.connect(userA).unpledge(0, unpledge_amount)
            const left = await crowdFund.checkPledgeAmount(0, userA.address);
            expect(left).to.be.equal(_amount - unpledge_amount)

            const balance = await erc20.balanceOf(userA.address)
            expect(balance).to.be.equal(initBalance - 500 + unpledge_amount)
        })
    })
    describe('exclaimCampaign', function () {
        it('It fails to exclaim campaign when it does not exist', async function() {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(start + ONE_DAY_IN_SECS)

            await expect(crowdFund.connect(campaignOwner1).exclaimCampaign(1)).to.be.revertedWith('campaign does not exist')
        })
        it('It fails to exclaim campaign when the campaign reacched the end', async function() {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(start + ONE_DAY_IN_SECS)

            await expect(crowdFund.connect(campaignOwner1).exclaimCampaign(0)).to.be.revertedWith('campaign is not end')
        })
        it('it fails to exclaim campaign when it is not owner', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1,campaignOwner2} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(end)

            await expect(crowdFund.connect(campaignOwner2).exclaimCampaign(0)).to.be.revertedWith('not owner')
        })
        it('It fails to exclaim the campaign when the pledge is smaller than goal', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA, userB, userC} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(start)

            await crowdFund.connect(userA).pledge(0, 1000)
            await crowdFund.connect(userB).pledge(0, 500)
            await crowdFund.connect(userC).pledge(0, 1000)

            await time.increaseTo(end)
            await expect(crowdFund.connect(campaignOwner1).exclaimCampaign(0)).to.be.revertedWith('pledged is not reached')
        })
        it('It exclaimed the campaign successfully', async function() {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA, userB, userC} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)
            await time.increaseTo(start)

            await crowdFund.connect(userA).pledge(0, 1000)
            await crowdFund.connect(userB).pledge(0, 1000)
            await crowdFund.connect(userC).pledge(0, 1000)

            await time.increaseTo(end)
            await expect(crowdFund.connect(campaignOwner1).exclaimCampaign(0)).to.emit(crowdFund, 'ExclaimCampaign')

            const balance = await crowdFund.getBalance(campaignOwner1)
            expect(balance).to.be.equal(3000)
        })
        it('It fails to exclaim the campaign when it is already exclaimed', async function () {

        })
    })
    describe('refundCampaign', function () {
        it('it fails to refund when the campaign does not exist', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)

            await expect(crowdFund.connect(userA).refundCampaign(1)).to.be.revertedWith('campaign does not exist')
        })
        it('it fails to refund when it is not end', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)

            await time.increaseTo(start + ONE_DAY_IN_SECS)

            await expect(crowdFund.connect(userA).refundCampaign(0)).to.be.revertedWith('campaign is not end')
        })
        it('It fails to refund when campaign.pledged >= campaign.goal', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA, userB, userC} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)

            await time.increaseTo(start)

            await crowdFund.connect(userA).pledge(0, 1000)
            await crowdFund.connect(userB).pledge(0, 1000)
            await crowdFund.connect(userC).pledge(0, 1000)

            await time.increaseTo(end)

            await expect(crowdFund.connect(userA).refundCampaign(0)).to.be.revertedWith('waiting for exclaim')
        })
        it('It refund successfully', async function () {
            const {crowdFund, latestTime, ONE_DAY_IN_SECS, ONE_WEEK_IN_SECS, goal, campaignOwner1, userA, userB, userC} = await loadFixture(deployCrowdFundFixture)
            const start = latestTime + ONE_DAY_IN_SECS
            const end = start + ONE_WEEK_IN_SECS
            await crowdFund.connect(campaignOwner1).createCampaign(start, end, goal)

            await time.increaseTo(start)

            await crowdFund.connect(userA).pledge(0, 1000)
            await crowdFund.connect(userB).pledge(0, 500)
            await crowdFund.connect(userC).pledge(0, 1000)

            await time.increaseTo(end)

            await expect(crowdFund.connect(userA).refundCampaign(0)).to.emit(crowdFund, 'RefundCampaign').withArgs(anyValue, 0, 1000)
            await expect(crowdFund.connect(userB).refundCampaign(0)).to.emit(crowdFund, 'RefundCampaign').withArgs(anyValue, 0, 500)
            await expect(crowdFund.connect(userC).refundCampaign(0)).to.emit(crowdFund, 'RefundCampaign').withArgs(anyValue, 0, 1000)
        })
    })
})