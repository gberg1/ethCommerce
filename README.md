ethCommerce

An Ethereum smart contract ecommerce marketplace application.

The code for the smart contract is written in Solidity using the Truffle development framework and can be found under the contracts directory with a majority of the logic in ethCommerce.sol.

The test suite for the smart contract is written in Javascript using Mocha and Chai. It can be found under the test directory where both success and exception cases are tested.

**********************************

To get started with this repository pull down the code from https://github.com/gberg1/ethCommerce and run:

`npm install`

Next, navigate to your terminal and initialize test accounts with pre defined private keys open up your terminal and run:

`chmod a+x starttestrpc.sh`

This makes sure that the starttestrpc.sh script is executable on mac or linux.

Next run the script via:

`./starttestrpc.sh`

***********************************

To run the test suite for the smart contract use:

`truffle test`

Each time a test suite is started truffle deploys the latest version of the smart contract to the Ethereum network. In our case our private Ethereum node.

If you have several test suites truffle will re-deploy the contract for each of them. Each test suite gets a unique contract address and starts with a fresh contract state. Keep in mind running a test suite will cost some gas for the deployment of the contract and to any function call that is non-free (alter the contract state).

***********************************

To start the truffle console run:

`truffle console`

***********************************

geth is the the command line interface for running a full ethereum node implemented in Go. We will use geth to run our private Ethereum node:

`geth attach`

`personal.unlockAccount(INSERT_ACCOUNT_NAME, INSERT_PASSWORD, 3600)`

Then try running the truffle test command again in a separate tab to run your test suite.

Documentation on geth can be found here:
https://github.com/ethereum/go-ethereum/wiki/geth

***********************************

To deploy the contract onto our private ethereum node run:

Start:

`./starttestrpc.sh`

Open a new tab and run:

`truffle migrate`

*Note if you have already ran truffle migrate to your contract and have existing changes you will need to run:*
`truffle migrate --reset`

**********************************

To open the UI part of the application on localhost run the following command:

`npm run dev`

Then navigate to localhost:3000 in your favorite web browser. Note you will need to have the Metamask chrome extension set up.

**********************************

To open the truffle console:

`truffle console`

Next, instantiate app reference to instance of contract:

`INSERT_CONTRACT_NAME.deployed().then(function(instance){app=instance;})`

Check an account balance on the private Ethereum node:

`web3.fromWei(web3.eth.getBalance(web3.eth.accounts[INSERT_INDEX]), 'ether').toNumber()`

Retrieve an article:

`app.getArticle.call()`

Sell an article:

`app.sellArticle('INSERT_ARTICLE_NAME', 'INSERT_ARTICLE_DESCRIPTION', web3.toWei(INSERT_PRICE, 'ether'), {from: web3.eth.accounts[INSERT_INDEX]})`

Watch the buy article event to be notified if an article is sold. Only watch for articles sold by our seller:

`var buyEvent = app.buyArticleEvent({_seller: web3.eth.accounts[INSERT_INDEX]}, {fromBlack: 0, toBlock: 'latest'}).watch(function(error, event) {console.log(event);})`

Watch the sell article event:

`var sellEvent = app.sellArticleEvent({_seller: web3.eth.accounts[INSERT_INDEX]}, {fromBlack: 0, toBlock: 'latest'}).watch(function(error, event) {console.log(event);})`

Get an article via generated getter:

`app.articles(INSERT_ARTICLE_ID)`

Get all articles for sale:

`app.getArticlesForSale()`

Purchase an article:

`app.buyArticle(INSERT_ARTICLE_ID, {from: web3.eth.accounts[INSERT_INDEX], value: web3.toWei(INSERT_PRICE, 'ether')})`

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

When we use Metamask to interact with our smart contract in the browser this will avoid us creating a new account every time we restart our server.

Next, in a new tab run:

`truffle migrate`

This deploys our smart contract to our testrpc Ethereum node.

Note that if we have already deployed the contract and we make changes to the contract we will want to instead run:

`truffle migrate --reset`

*********************************

To deactivate the smart contract from the Ethereum node launch the truffle console and after deploying an instance of the smart contract use:

`app.kill({from: web3.eth.accounts[INSERT_SMART_CONTRACT_OWNER_INDEX]})`

Note that in order to deactivate the contract you must use the account that deployed the smart contract in the first place or you will get an error. This is on purpose to avoid hackers being able to shut down your smart contract without your consent!

Also note that if you send value to a smart contract, in our case buy an article, even after it has been deactivated, your Ether will be stored in the smart contract and taken from the account you send it from so be careful not to send Ether to a deactivated smart contract or you will lose it.

*********************************

To deploy the static frontend of the app use:

`./starttestrpc.sh`

`truffle migrate`

`chmod a+x deployfrontend.sh`

`./deployfrontend.sh`
