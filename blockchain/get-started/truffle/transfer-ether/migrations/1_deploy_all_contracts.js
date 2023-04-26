
const Receiver = artifacts.require("Receiver");
const Bank = artifacts.require("Bank");

module.exports = function(deployer) {
    deployer.deploy(Receiver, "Receiver1");
    deployer.deploy(Receiver, "Receiver2");
    deployer.deploy(Bank);
}