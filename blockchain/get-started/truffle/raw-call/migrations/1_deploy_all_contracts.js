const Receiver = artifacts.require("Receiver");
const Sender = artifacts.require("Sender");

module.exports = function(deployer) {
  deployer.deploy(Receiver).then(function() {
    return deployer.deploy(Sender, Receiver.address);
  });
}
