const METoken = artifacts.require("METoken");
const Agent = artifacts.require("Agent");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(METoken, "My first token", "demo1", {from: accounts[0]}).then(function() {
    return deployer.deploy(Agent, METoken.address, accounts[0]);
  });
}