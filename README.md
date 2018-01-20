ethCommerce

An Ethereum smart contract ecommerce marketplace application.

To get started pull down the code from github ethCommerce repo and run:

`npm install`

Next, navigate to your terminal and initialize test accounts with pre defined private keys open up your terminal and run:

`chmod a+x starttestrpc.sh`

This makes sure that the starttestrpc.sh script is executable on mac or linux.

Next run the script via:

`./starttestrpc.sh`

***********************************

To start the truffle console run:

`truffle console`

***********************************

Note eventually you will not want to use a test ethereum node anymore and will want to use a private ethereum node for a variety of reasons.

You may run into a permission error when you run the truffle test command because by default all accounts in a testrpc environment are unlocked,
where as when you move onto a private ethereum node the accounts you want to interact with for your smart contract may be locked by default.
When your private ethereum node you are running to test with (not testrpc) is running open a new terminal tab and run:

`geth attach`

`personal.unlockAccount(INSERT_ACCOUNT_NAME, INSERT_PASSWORD, 3600)`

Then try running the truffle test command again in a separate tab to run your test suite and that should work successfully (assuming your code isn't broken of course!)

***********************************

Deploying your contract on a private Ethereum node

Start:

`./starttestrpc.sh`

Deploy contract to private Ethereum node for first time. New tab:

`truffle migrate`

*Note if you have already ran truffle migrate to your contract and have existing changes you will need to run:*
`truffle migrate --reset`

Open truffle console:

`truffle console`

Next, instantiate app reference to instance of contract:

`INSERT_CONTRACT_NAME.deployed().then(function(instance){app=instance;})`

Check an account balance on the private Ethereum node:

`web3.fromWei(web3.eth.getBalance(web3.eth.accounts[INSERT_INDEX]), 'ether').toNumber()`

Retrieve an article:

`app.getArticle.call()`

Sell an article:

`app.sellArticle('INSERT_ARTICLE_NAME', 'INSERT_ARTICLE_DESCRIPTION', web3.toWei(INSERT_PRICE, 'ether'), {from: web3.eth.accounts[INSERT_INDEX]})`

Watch the buy article event to be notified if an article is sold Only watch for articles sold by our seller:

`var buyEvent = app.buyArticleEvent({_seller: web3.eth.accounts[INSERT_INDEX]}, {fromBlack: 0, toBlock: 'latest'}).watch(function(error, event) {console.log(event);})`

Purchase an article:

`app.buyArticle({from: web3.eth.accounts[INSERT_INDEX], value: web3.toWei(INSERT_PRICE, 'ether')})`

In order to restart your Ethereum node execute the following commands.

To exit truffle console:

`.exit`

To test if our logic holds true lets send not enough ether to cover the price of an article that is for sale:

`truffle migrate --reset`

`truffle console`

`INSERT_CONTACT_NAME.deployed().then(function(instance){app=instance;})`

`app.sellArticle('INSERT_ARTICLE_NAME', 'INSERT_ARTICLE_DESCRIPTION', web3.toWei(INSERT_PRICE, 'ether'), {from: web3.eth.accounts[INSERT_INDEX]})`

`app.getArticle.call()`

`app.buyArticle({from: web3.eth.accounts[2], value: web3.toWei(5, 'ether')})`

*********************************

When we use Metamask to iteract with our smart contract in the browser this will avoid us creating a new account every time we restart our server.

Next, in a new tab run:

`truffle migrate`

This deploys our smart contract to our testrpc Ethereum node.

Note that if we have already deployed the contract and we make changes to the contract we will want to instead run:

`truffle migrate --reset`

Next, run:

`npm run dev`

This will launch our web app in the browser using lite-server.

*********************************

If at any point you want to run the test suite for the smart contract use:

`truffle test`

Each time a test suite is started truffle deploys the latest version of the smart contract to the Ethereum network. In our case our private Ethereum node.
If you have several test suites truffle will re-deploy the contract for each of them. This means that if you have several test suites, truffle will re-deploy the contract for each of them. Each test suite gets a unique contract address and starts with a fresh contract state. Keep in mind running a test suite will cost some gas for the deployment pf the contract and to any function call that is non-free (alter the contract state).
