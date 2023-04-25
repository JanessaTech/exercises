const ArrayLib = artifacts.require("ArrayLib");
const TestArray = artifacts.require("TestArray");

module.exports = function(deployer) {
  deployer.deploy(ArrayLib);
  deployer.link(ArrayLib, TestArray);
  deployer.deploy(TestArray);
}
