const {expect}  = require('chai')
const hre = require('hardred')
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('Lock', function () {
    it("Should set the right unlockTime", async function () {
        const lockedAmount = 1_000_000_000;
        const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
        const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
        const lock = await ethers.deployContract("Lock", [unlockTime], {
            value: lockedAmount,
          });
          
        expect(await lock.unlockTime()).to.equal(unlockTime);

    })
})