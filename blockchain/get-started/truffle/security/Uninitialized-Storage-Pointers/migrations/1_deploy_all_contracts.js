const NameRegistrar = artifacts.require("NameRegistrar");

module.exports = function(deployer) {
  deployer.deploy(NameRegistrar);
}