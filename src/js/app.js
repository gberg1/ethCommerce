App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      // Ensure we use latest version of web3
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    App.displayAccountInfo();
    return App.initContract();
  },

  displayAccountInfo: function() {
    web3.eth.getCoinbase(function(err, account) {
      if (err == null) {
        App.account = account;
        $('#account').text(account);
        web3.eth.getBalance(account, function(err, balance) {
          if (err == null) {
            $('#accountBalance').text(web3.fromWei(balance, 'ether') + ' ETH');
          }
        });
      }
    });
  },

  initContract: function() {
    // Access to getJSON via browser sync package
    // See bs-config.json which allows exposure to ./build/contracts at root of web app
    $.getJSON('ethCommerce.json', function(ethCommerceArtifact) {
      App.contracts.ethCommerce = TruffleContract(ethCommerceArtifact);
      App.contracts.ethCommerce.setProvider(App.web3Provider);
      return App.reloadArticles();
    });
  },

  reloadArticles: function() {
    // Balance may have changed so reload account information
    App.displayAccountInfo();

    App.contracts.ethCommerce.deployed().then(function(instance) {
      return instance.getArticle.call();
    }).then(function(article) {
      // Return if no article
      if (article[0] === 0x0) {
        return;
      }

      // Clear out article placeholder
      var articlesRow = $('#articlesRow');
      articlesRow.empty();

      // Fill article template
      var articleTemplate = $('#articleTemplate');
      articleTemplate.find('.panel-title').text(article[1]);
      articleTemplate.find('.article-description').text(article[2]);
      articleTemplate.find('.article-price').text(web3.fromWei(article[3], 'ether'));

      var seller = article[0];
      if (seller === App.account) {
        seller = "You";
      }

      articleTemplate.find('.article-seller').text(seller);
      articlesRow.append(articleTemplate.html());
    }).catch(function(err) {
      console.log(err.message);
    });
  },




};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
