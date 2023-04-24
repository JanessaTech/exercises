const EtherStore = artifacts.require("EtherStore");
const Bank = artifacts.require("Bank");

module.exports = function(deployer) {
  deployer.deploy(EtherStore);
  deployer.deploy(Bank, {value: web3.utils.toWei('1', "ether")});
};
