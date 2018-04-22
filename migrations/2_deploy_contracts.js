var EthCommerce = artifacts.require('./EthCommerce.sol');

module.exports = function(deployer) {
  deployer.deploy(EthCommerce);
}
