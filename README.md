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

***********************************

Note eventually you will not want to use a test ethereum node anymore and will want to use a private ethereum node for a variety of reasons.

You may run into a permission error when you run the truffle test command because by default all accounts in a testrpc environment are unlocked,
where as when you move onto a private ethereum node the accounts you want to interact with for your smart contract may be locked by default.
When your private ethereum node you are running to test with (not testrpc) is running open a new terminal tab and run:

`geth attach`

`personal.unlockAccount(INSERT_ACCOUNT_NAME, INSERT_PASSWORD, 3600)`

Then try running the truffle test command again in a separate tab to run your test suite and that should work successfully (assuming your code isn't broken of course!)
