const EtherStore = artifacts.require("EtherStore");

module.exports = function(deployer) {
  deployer.deploy(EtherStore);
};
