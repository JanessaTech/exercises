const SendEther = artifacts.require("SendEther");
const ReceiveEther = artifacts.require("ReceiveEther");

module.exports = function(deployer) {
  deployer.deploy(SendEther);
  deployer.deploy(ReceiveEther);
}