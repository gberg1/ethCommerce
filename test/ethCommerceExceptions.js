var ethCommerce = artifacts.require('./ethCommerce.sol');

// Test suite
contract('ethCommerce', function(accounts) {
  var ethCommerceInstance;
  var seller = accounts[1];
  var buyer = accounts[2];
  var articleId = 1;
  var articleName = 'article 1';
  var articleDescription = 'Description for article 1';
  var articlePrice = 10;

  it('should throw an exception if you try to buy an article when there is no article for sale', function() {
    return ethCommerce.deployed().then(function(instance) {
        ethCommerceInstance = instance;
        return ethCommerceInstance.buyArticle(articleId, {
          from: buyer,
          value: web3.toWei(articlePrice, 'ether')
        });
      }).then(assert.fail)
      .catch(function(error) {
        assert(error.message.indexOf('invalid opcode') >= 0, 'error message must contain invalid opcode');
      }).then(function() {
        return ethCommerceInstance.getNumberOfArticles();
      }).then(function(data) {
        //make sure sure the contract state was not altered
        assert.equal(data.toNumber(), 0, 'number of articles must be zero');
      });
  });

  it('should throw an exception if you try to buy an article that does not exist', function() {
    return ethCommerce.deployed().then(function(instance) {
        ethCommerceInstance = instance;
        return ethCommerceInstance.sellArticle(articleName, articleDescription, web3.toWei(articlePrice, 'ether'), {
          from: seller
        });
      }).then(function(receipt) {
        return ethCommerceInstance.buyArticle(2, {
          from: buyer,
          value: web3.toWei(articlePrice, 'ether')
        });
      }).then(assert.fail)
      .catch(function(error) {
        assert(error.message.indexOf('invalid opcode') >= 0, 'error message must contain invalid opcode');
      }).then(function() {
        // Ensure contract state was not altered from call to sellArticle
        return ethCommerceInstance.articles(articleId);
      }).then(function(data) {
        assert.equal(data[0].toNumber(), articleId, 'article id must be ' + articleId);
        assert.equal(data[1], seller, 'seller must be ' + seller);
        assert.equal(data[2], 0x0, 'buyer must be empty');
        assert.equal(data[3], articleName, 'article name must be ' + articleName);
        assert.equal(data[4], articleDescription, 'article description must be ' + articleDescription);
        assert.equal(data[5].toNumber(), web3.toWei(articlePrice, 'ether'), 'article price must be ' + web3.toWei(articlePrice, 'ether'));
      });
  });

  it('should throw an exception if you try to buy your own article', function() {
    return ethCommerce.deployed().then(function(instance) {
        ethCommerceInstance = instance;
        // Already called sellArticle method on same articleId with same seller in previous test
        return ethCommerceInstance.buyArticle(articleId, {
          from: seller,
          value: web3.toWei(articlePrice, 'ether')
        });
      }).then(assert.fail)
      .catch(function(error) {
        assert(error.message.indexOf('invalid opcode') >= 0, 'error message must contain invalid opcode');
      }).then(function() {
        return ethCommerceInstance.articles(articleId);
      }).then(function(data) {
        // Ensure contract state was not altered by call to buyArticle
        assert.equal(data[0].toNumber(), articleId, 'article id must be ' + articleId);
        assert.equal(data[1], seller, 'seller must be ' + seller);
        assert.equal(data[2], 0x0, 'buyer must be empty');
        assert.equal(data[3], articleName, 'article name must be ' + articleName);
        assert.equal(data[4], articleDescription, 'article description must be ' + articleDescription);
        assert.equal(data[5].toNumber(), web3.toWei(articlePrice, 'ether'), 'article price must be ' + web3.toWei(articlePrice, 'ether'));
      });
  });

  it('should throw an exception if you try to buy an article for a value different from its price', function() {
    return ethCommerce.deployed().then(function(instance) {
        ethCommerceInstance = instance;
        return ethCommerceInstance.buyArticle(articleId, {
          from: buyer,
          value: web3.toWei(articlePrice + 1, 'ether')
        });
      }).then(assert.fail)
      .catch(function(error) {
        assert(error.message.indexOf('invalid opcode') >= 0, 'error message must contain invalid opcode');
      }).then(function() {
        return ethCommerceInstance.articles(articleId);
      }).then(function(data) {
        // Ensure contract state was not altered by call to buyArticle
        assert.equal(data[0].toNumber(), articleId, 'article id must be ' + articleId);
        assert.equal(data[1], seller, 'seller must be ' + seller);
        assert.equal(data[2], 0x0, 'buyer must be empty');
        assert.equal(data[3], articleName, 'article name must be ' + articleName);
        assert.equal(data[4], articleDescription, 'article description must be ' + articleDescription);
        assert.equal(data[5].toNumber(), web3.toWei(articlePrice, 'ether'), 'article price must be ' + web3.toWei(articlePrice, 'ether'));
      });
  });

  it('should throw an exception if you try to buy an article that has already been sold', function() {
    return ethCommerce.deployed().then(function(instance) {
        ethCommerceInstance = instance;
        return ethCommerceInstance.buyArticle(articleId, {
          from: buyer,
          value: web3.toWei(articlePrice, 'ether')
        });
      }).then(function() {
        return ethCommerceInstance.buyArticle(articleId, {
          from: web3.eth.accounts[0],
          value: web3.toWei(articlePrice, 'ether')
        });
      }).then(assert.fail)
      .catch(function(error) {
        assert(error.message.indexOf('invalid opcode') >= 0, 'error message must contain invalid opcode');
      }).then(function() {
        return ethCommerceInstance.articles(articleId);
      }).then(function(data) {
        // Ensure contract state was not altered by call to buyArticle
        assert.equal(data[0].toNumber(), articleId, 'article id must be ' + articleId);
        assert.equal(data[1], seller, 'seller must be ' + seller);
        assert.equal(data[2], buyer, 'buyer must be ' + buyer);
        assert.equal(data[3], articleName, 'article name must be ' + articleName);
        assert.equal(data[4], articleDescription, 'article description must be ' + articleDescription);
        assert.equal(data[5].toNumber(), web3.toWei(articlePrice, 'ether'), 'article price must be ' + web3.toWei(articlePrice, 'ether'));
      });
  });

});
