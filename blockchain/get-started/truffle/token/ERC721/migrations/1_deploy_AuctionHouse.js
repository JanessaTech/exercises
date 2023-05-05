const AuctionHouse = artifacts.require("AuctionHouse");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(AuctionHouse, {from: accounts[0]});
}