const SecuredFindThisHash = artifacts.require("SecuredFindThisHash");

module.exports = function(deployer) {
  deployer.deploy(SecuredFindThisHash, {value: web3.utils.toWei('1', "ether")});
}