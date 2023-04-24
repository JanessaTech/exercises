const NoFallbackPayableTest = artifacts.require("NoFallbackPayableTest");
const HasFallbackAndReceiveTest = artifacts.require("HasFallbackAndReceiveTest");
const HasFallbackOnlyTest = artifacts.require("HasFallbackOnlyTest");

module.exports = function(deployer) {
  deployer.deploy(NoFallbackPayableTest);
  deployer.deploy(HasFallbackAndReceiveTest);
  deployer.deploy(HasFallbackOnlyTest);
}
