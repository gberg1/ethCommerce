var ethCommerce = artifacts.require('./ethCommerce.sol');

// Test suite
contract('ethCommerce', function(accounts) {

  var ethCommerceInstance;
  var seller = accounts[1];
  var articleName = 'article 1';
  var articleDescription = 'Description for article 1';
  var articlePrice = 10;

  it('should be initialized with empty values', function() {
    return ethCommerce.deployed().then(function(instance) {
      return instance.getArticle.call();
    }).then(function(data) {
      assert.equal(data[0], 0x0, 'seller must be empty');
      assert.equal(data[1], '', 'article name must be empty');
      assert.equal(data[2], '', 'description must be empty');
      assert.equal(data[3].toNumber(), 0, 'article price must be zero');
    });
  });

  it('should sell an article', function() {
    return ethCommerce.deployed().then(function(instance) {
      ethCommerceInstance = instance;
      return ethCommerceInstance.sellArticle(articleName, articleDescription, web3.toWei(articlePrice, 'ether'), {from: seller});
    }).then(function() {
      return ethCommerceInstance.getArticle.call();
    }).then(function(data) {
      assert.equal(data[0], seller, 'seller must be ' + seller);
      assert.equal(data[1], articleName, 'articleName must be ' + articleName);
      assert.equal(data[2], articleDescription, 'articleDescription must be ' + articleDescription);
      assert.equal(data[3].toNumber(), web3.toWei(articlePrice, 'ether'), 'article price must be ' + web3.toWei(articlePrice, 'ether'));
    });
  });
});