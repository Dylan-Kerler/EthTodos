## Quick Start

First thing is to get the private key out of metamask. 
Open metamask, click on the 3 small dots next to the address at the top, "Account Details" and then "Export Private Key".

Then we can start the blockchain. Your private key has to be manually prefixed with "0x" in order for ganache to parse it.

`ganache-cli -p 7545 --account="0x<your private key>, 1000000000000000000000"`

And now to deploy the contract:

`npm install`

`npm run deploy-contracts`

Then metamask needs to be able to connect to the network. Add a custom network in metamask with this url: http://127.0.0.1:7545

To start up the app (may take a few seconds for initial start-up):

`npm run start`

To test:

`npm run test-contracts`

## Just a little message

As with lots of things in cryptocurrency development there are a lot of moving parts to getting this working - I thought it would be good for you to be able to run this locally so you can play around with the code and see what I was trying to do in places etc. - But if something fails, just let me know and I can deploy to ropsten, spin up a heroku instance then send you guys the url.

I had a look through your codebase and think some of the conventions your using are really good. I tried to make my project as closely resemble yours as possible through the Context usage and folder structure etc.

Normally I would split `smart_contracts` dir into a diffrent location instead of being embedded in `src` dir but I needed the smart contract artifact file generated after a migration and create-react-app's config doesn't let you do relative imports that reach outside of `src`. Fixing that issue seemed outside the scope of the task. 

It seems there is a small bug with metamask in regards to gas fee estimation. If you get the error "cannot read .toNumber() of null" then you may need to restart chrome and it should fix the issue.