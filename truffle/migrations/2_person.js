var PersonTeste = artifacts.require("./PersonTeste.sol");

module.exports = function(deployer) {
  deployer.deploy(PersonTeste, "Henrique", "fale.henrique@gmail.com");
};
