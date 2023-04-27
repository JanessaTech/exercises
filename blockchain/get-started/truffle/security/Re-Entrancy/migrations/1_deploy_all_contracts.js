const EtherStore = artifacts.require("EtherStore");
const Attack = artifacts.require("Attack");

module.exports = function(deployer) {
  deployer.deploy(EtherStore).then(function() {
    return deployer.deploy(Attack, EtherStore.address);
  });
}