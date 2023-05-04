const Faucet = artifacts.require("Faucet");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Faucet, {from: accounts[0]});
}