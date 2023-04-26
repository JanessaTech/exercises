const Lib = artifacts.require("Lib");
const HackMe = artifacts.require("HackMe");
const Attacker = artifacts.require("Attacker");

module.exports = function(deployer) {
  deployer.deploy(Lib).then(function() {
    return deployer.deploy(HackMe, Lib.address);
  }).then(function() {
    return deployer.deploy(Attacker, HackMe.address);
  });
}