const classRoom = artifacts.require("ClassRoom");
const students = artifacts.require("Students");
// there are two places to specify parameters like gas, from etc.
// 1. One is pass them as options. See ： https://trufflesuite.com/docs/truffle/how-to/contracts/run-migrations/#deployer-api
// 2. Another is define them in truffle-config.js. See https://trufflesuite.com/docs/truffle/reference/configuration#networks
module.exports = function (deployer, network, accounts) {
    if (network === "A") {
        deployer.deploy(classRoom, {overwrite: true, from: accounts[0]});
    } else if (network === "B") {
        deployer.deploy(students, {overwrite: true, from: accounts[1]});
    } else {
        deployer.deploy(classRoom, {overwrite: true, from: accounts[2]});
        deployer.deploy(students, {overwrite: true, from: accounts[2]});
    }

}