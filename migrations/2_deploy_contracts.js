var ethCommerce = artifacts.require('./ethCommerce.sol');

module.exports = function(deployer) {
  deployer.deploy(ethCommerce);
}
