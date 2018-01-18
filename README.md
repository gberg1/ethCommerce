ethCommerce

An Ethereum smart contract ecommerce marketplace application.

To get started pull down the code from github ethCommerce repo and run:

`npm install`

Next, navigate to your terminal and initialize test accounts with pre defined private keys open up your terminal and run:

`chmod a+x starttestrpc.sh`

This makes sure that the starttestrpc.sh script is executable on mac or linux.

Next run the script via:

`./starttestrpc.sh`

When we use Metamask to iteract with our smart contract in the browser this will avoid us creating a new account every time we restart our server.

Next, in a new tab run:

`truffle migrate`

This deploys our smart contract to our testrpc Ethereum node.

Note that if we have already deployed the contract and we make changes to the contract we will want to instead run:

`truffle migrate --reset`

Next, run:

`npm run dev`

This will launch our web app in the browser using lite-server.

If at any point you want to run the test suite for the ethCommerce smart contract use:

`truffle test`

***********************************

To start the truffle console run:

`truffle console`
