const METoken = artifacts.require("METoken");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(METoken, "My first token", "demo1", {from: accounts[0]});
}