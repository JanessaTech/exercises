const Wallet = artifacts.require("Wallet");
const Attack = artifacts.require("Attack");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Wallet, {from: accounts[0], value: web3.utils.toWei('1', "ether")}).then(function() {
    return deployer.deploy(Attack, Wallet.address, {from: accounts[1]});
  });
}