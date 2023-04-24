const ContractC = artifacts.require("ContractC");
const ContractB = artifacts.require("ContractB");
const ContractA = artifacts.require("ContractA");

module.exports = function(deployer) {
  //deployer.deploy(ContractC).then((ContractCInstance) => console.log("ContractC latest address:" + ContractCInstance.address))
  deployer.deploy(ContractC).then(function() {
    return deployer.deploy(ContractB, ContractC.address);
  }).then(function() {
    return deployer.deploy(ContractA, ContractB.address);
  });
}
