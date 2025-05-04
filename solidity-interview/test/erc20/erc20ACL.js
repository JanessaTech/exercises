const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");

describe('ERC20ACL', function () {
    async function deployERC20ACLFixture() {
        const [admin, nonadmin, minter, burner, Bob, ...others] = await ethers.getSigners()
        const ERC20ACL = await ethers.getContractFactory('ERC20ACL')
        const name = 'aclerc20'
        const symbol = 'aclerc20'
        const erc20ACL = await ERC20ACL.deploy(name, symbol, admin.getAddress(), minter.getAddress(), burner.getAddress())
        return {erc20ACL, admin, nonadmin, minter, burner, Bob}
    }
    describe('init', function () {
        it('init', async function () {
            const {erc20ACL} = await loadFixture(deployERC20ACLFixture)
        })  
    })
    describe('mint', function () {
        it('it minted successfully', async function () {
            const {erc20ACL, minter, Bob} = await loadFixture(deployERC20ACLFixture)
            const amount = 1000
            await expect(erc20ACL.connect(minter).mint(Bob.getAddress(), amount)).not.to.be.reverted
            const balance = await erc20ACL.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(amount)
        })
        it('it failed to mint when it is not the minter', async function () {
            const {erc20ACL, Bob}= await loadFixture(deployERC20ACLFixture)
            const amount = 1000
            await expect(erc20ACL.mint(Bob.getAddress(), amount)).to.be.revertedWithCustomError(erc20ACL, 'AccessControlUnauthorizedAccount')
        })
    })
    describe('burn', function () {
        it('it burned the token successfully', async function () {
            const {erc20ACL, burner,minter, Bob} = await loadFixture(deployERC20ACLFixture)
            const amount  = 1000
            await erc20ACL.connect(minter).mint(Bob.getAddress(), 1000)
            await erc20ACL.connect(burner).burn(Bob.getAddress(), 300)
            const balance = await erc20ACL.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(700)
        })
        it('it failed to burn when it is not burner', async function () {
            const {erc20ACL, minter, burner, Bob} = await loadFixture(deployERC20ACLFixture)
            const amount = 1000
            await erc20ACL.connect(minter).mint(Bob.getAddress(), 1000)
            await expect(erc20ACL.burn(Bob.getAddress(), 300)).to.be.revertedWithCustomError(erc20ACL, 'AccessControlUnauthorizedAccount')
        })
    })

    describe('revokeMinter', function () {
        it('it revoked successfully', async function () {
            const {erc20ACL, admin, minter, Bob} = await loadFixture(deployERC20ACLFixture)
            const amount = 1000
            await expect(erc20ACL.connect(minter).mint(Bob.getAddress(), amount)).not.to.be.reverted
            await erc20ACL.connect(admin).revokeMinter(minter)
            await expect(erc20ACL.connect(minter).mint(Bob.getAddress(), amount)).to.be.revertedWithCustomError(erc20ACL, 'AccessControlUnauthorizedAccount')

        })
        it('it failed to revoke when it is not admin', async function () {
            const {erc20ACL, admin, nonadmin, minter, Bob} = await loadFixture(deployERC20ACLFixture)
            const amount = 1000
            await expect(erc20ACL.connect(minter).mint(Bob.getAddress(), amount)).not.to.be.reverted
            await expect(erc20ACL.connect(nonadmin).revokeMinter(minter)).to.be.revertedWithCustomError(erc20ACL, 'AccessControlUnauthorizedAccount')
        })
    })
})