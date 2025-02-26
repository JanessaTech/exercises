const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('SubscriptionPayment', function () {
    async function deploySubscriptionPaymentFixture() {
        const [owner, userA, userB, userC, ...others] = await ethers.getSigners()
        const SubscriptionPayment = await ethers.getContractFactory('SubscriptionPayment', owner)
        const price = 1000
        const one_month_in_secs = 60 * 60 * 24 * 30
        const one_day_in_secs = 60 * 60 * 24 * 1

        const subscriptionPayment = await SubscriptionPayment.deploy(price, one_month_in_secs)
        return {subscriptionPayment, owner, userA, userB, userC, price, one_month_in_secs, one_day_in_secs}
    }

    describe('pay', function () {
        it('it fails to pay when the incorrect payment', async function () {
            const {subscriptionPayment, userA} = await loadFixture(deploySubscriptionPaymentFixture)
            await expect(subscriptionPayment.connect(userA).pay({value: 500})).to.be.revertedWith('Incorrect payment')
        })
        it('it pays successfully', async function (){
            const {subscriptionPayment, userA, price} = await loadFixture(deploySubscriptionPaymentFixture)
            await expect(subscriptionPayment.connect(userA).pay({value: price})).to.emit(subscriptionPayment, 'Payment')
        })
        it('it fails to pay twice when the second payment happens within one month after the first payment', async function () {
            const {subscriptionPayment, userA, price, one_day_in_secs} = await loadFixture(deploySubscriptionPaymentFixture)
            await subscriptionPayment.connect(userA).pay({value: price})
            const latest = await time.latest()
            //console.log('latest:',  latest)
            await time.setNextBlockTimestamp(latest + one_day_in_secs)
            //console.log('latest + one_month_in_secs + one_day_in_secs1:', latest + one_day_in_secs)
            await expect(subscriptionPayment.connect(userA).pay({value: price})).to.be.revertedWith('You already payed')
        })
        it('it pays twice successfully when the second payment happens one month after the first payment', async function () {
            const {subscriptionPayment, userA, price, one_month_in_secs, one_day_in_secs} = await loadFixture(deploySubscriptionPaymentFixture)
            await subscriptionPayment.connect(userA).pay({value: price})
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + one_month_in_secs + 1)
            await expect(subscriptionPayment.connect(userA).pay({value: price})).to.emit(subscriptionPayment, 'Payment')
        })
    })

    describe('listenMusic', function () {
        it('it fails to play music when no payment', async function () {
            const {subscriptionPayment, userA} = await loadFixture(deploySubscriptionPaymentFixture)
            await expect(subscriptionPayment.connect(userA).listenMusic()).to.be.revertedWith('you are unpayed')
        })
        it('it plays music when the payment is done', async function () {
            const {subscriptionPayment, userA, price} = await loadFixture(deploySubscriptionPaymentFixture)
            await subscriptionPayment.connect(userA).pay({value: price})
            const response = await subscriptionPayment.connect(userA).listenMusic()

            expect(response).to.be.equal('ok')
        })
        it('it fails to play music when the payment is expired', async function () {
            const {subscriptionPayment, userA, price, one_month_in_secs} = await loadFixture(deploySubscriptionPaymentFixture)
            await subscriptionPayment.connect(userA).pay({value: price})
            const latest = await time.latest()
            await time.increaseTo(latest + one_month_in_secs + 1)
            
            await expect(subscriptionPayment.connect(userA).listenMusic()).to.be.revertedWith('you are unpayed')
        })
    })
    describe('delete subscriber', function () {
        it('It deleted the expired userA successfully', async function () {
            const {subscriptionPayment, owner, userA, userB, one_day_in_secs, one_month_in_secs, price} = await loadFixture(deploySubscriptionPaymentFixture)
            await subscriptionPayment.connect(userA).pay({value: price})
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + one_day_in_secs)
            await subscriptionPayment.connect(userB).pay({value: price})
            await time.increaseTo(latest + one_month_in_secs + 1)
            await expect(subscriptionPayment.connect(userA).listenMusic()).to.be.revertedWith('you are unpayed')
            const response = await subscriptionPayment.connect(userB).listenMusic()
            expect(response).to.be.equal('ok')

            await subscriptionPayment.connect(owner).clearUnpayedSubscribers()

            const subscribers = await subscriptionPayment.getSubscribers()
            expect(subscribers).to.include.members([userB.address])

        })
    })
})