var ethCommerce = artifacts.require("./ethCommerce.sol");

// Test suite
contract('ethCommerce', function(accounts) {
  var ethCommerceInstance;
  var seller = accounts[1];
  var buyer = accounts[2];
  var articleName = "article 1";
  var articleDescription = "Description for article 1";
  var articlePrice = 10;

  // Test case: no article for sale yet
  it("should throw an exception if you try to buy an article when there is no article for sale", function() {
    return ethCommerce.deployed().then(function(instance) {
      ethCommerceInstance = instance;
      return ethCommerceInstance.buyArticle({
        from: buyer,
        value: web3.toWei(articlePrice, "ether")
      });
    }).then(assert.fail) // Test that call throws exception
    .catch(function(error) {
      assert(error.message.indexOf('invalid opcode') >= 0, error.message.indexOf('invalid opcode') >= 0);
    }).then(function() {
      return ethCommerceInstance.getArticle.call();
    }).then(function(data) {
      // Make sure sure the contract state was not altered
      assert.equal(data[0], 0x0, "seller must be empty");
      assert.equal(data[1], 0x0, "buyer must be empty");
      assert.equal(data[2], '', "article name must empty");
      assert.equal(data[3], '', "article description must be empty");
      assert.equal(data[4].toNumber(), 0, "article price must be 0");
    });
  });

  // Test case: buying an article you are selling
  it("should throw an exception if you try to buy your own article", function() {
    return ethCommerce.deployed().then(function(instance) {
      ethCommerceInstance = instance;
      return ethCommerceInstance.sellArticle(articleName, articleDescription, web3.toWei(articlePrice, "ether"), {
        from: seller
      });
    }).then(function(receipt) {
      return ethCommerceInstance.buyArticle({
        from: seller,
        value: web3.toWei(articlePrice, "ether")
      });
    }).then(assert.fail) // Test that call throws exception
    .catch(function(error) {
      assert(error.message.indexOf('invalid opcode') >= 0, error.message.indexOf('invalid opcode') >= 0);
    }).then(function() {
      return ethCommerceInstance.getArticle.call();
    }).then(function(data) {
      //make sure sure the contract state was not altered
      assert.equal(data[0], seller, "seller must be " + seller);
      assert.equal(data[1], 0x0, "buyer must be empty");
      assert.equal(data[2], articleName, "article name must be " + articleName);
      assert.equal(data[3], articleDescription, "article description must be " + articleDescription);
      assert.equal(data[4].toNumber(), web3.toWei(articlePrice, "ether"), "article price must be " + web3.toWei(articlePrice, "ether"));
    });
  });

  // Test case: incorrect value
  it("should throw an exception if you try to buy an article for a value different from its price", function() {
    return ethCommerce.deployed().then(function(instance) {
      ethCommerceInstance = instance;
      return ethCommerceInstance.buyArticle({
        from: buyer,
        value: web3.toWei(articlePrice + 1, "ether")
      });
    }).then(assert.fail) // Test that call throws exception
    .catch(function(error) {
      assert(error.message.indexOf('invalid opcode') >= 0, error.message.indexOf('invalid opcode') >= 0);
    }).then(function() {
      return ethCommerceInstance.getArticle.call();
    }).then(function(data) {
      // Make sure sure the contract state was not altered
      assert.equal(data[0], seller, "seller must be " + seller);
      assert.equal(data[1], 0x0, "buyer must be empty");
      assert.equal(data[2], articleName, "article name must be " + articleName);
      assert.equal(data[3], articleDescription, "article description must be " + articleDescription);
      assert.equal(data[4].toNumber(), web3.toWei(articlePrice, "ether"), "article price must be " + web3.toWei(articlePrice, "ether"));
    });
  });

  // Test case: article has already been sold
  it("should throw an exception if you try to buy an article that has already been sold", function() {
    return ethCommerce.deployed().then(function(instance) {
      ethCommerceInstance = instance;
      return ethCommerceInstance.buyArticle({
        from: buyer,
        value: web3.toWei(articlePrice, "ether")
      });
    }).then(function() {
      return ethCommerceInstance.buyArticle({
        from: web3.eth.accounts[0],
        value: web3.toWei(articlePrice, "ether")
      });
    }).then(assert.fail) // Test that call throws exception
    .catch(function(error) {
      assert(error.message.indexOf('invalid opcode') >= 0, error.message.indexOf('invalid opcode') >= 0);
    }).then(function() {
      return ethCommerceInstance.getArticle.call();
    }).then(function(data) {
      // Make sure sure the contract state was not altered
      assert.equal(data[0], seller, "seller must be " + seller);
      assert.equal(data[1], buyer, "buyer must be empty");
      assert.equal(data[2], articleName, "article name must be " + articleName);
      assert.equal(data[3], articleDescription, "article description must be " + articleDescription);
      assert.equal(data[4].toNumber(), web3.toWei(articlePrice, "ether"), "article price must be " + web3.toWei(articlePrice, "ether"));
    });
  });

});
