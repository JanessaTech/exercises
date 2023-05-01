const Bank = artifacts.require("Bank");
const Logger = artifacts.require("Logger");
const Attack = artifacts.require("Attack");
const HoneyPot = artifacts.require("HoneyPot");

/*
module.exports = function(deployer) {
    deployer.deploy(Logger).then(function() {
      return deployer.deploy(Bank, Logger.address).then(function() {
        return deployer.deploy(Attack, Bank.address);
      });
    });
  }
*/

module.exports = function(deployer) {
    deployer.deploy(HoneyPot).then(function() {
      return deployer.deploy(Bank, HoneyPot.address).then(function() {
        return deployer.deploy(Attack, Bank.address);
      });
    });
  }