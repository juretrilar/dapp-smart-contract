# dapp-smart-contract
Harness the power of Ethereum smart contracts, tokens and decentralized client apps with this examplary template.

Todo:
- fixes
- comments translation and documentation

This is showcase of almost every practical use of ethereum blockchain:
- smart contracts,
- tokenisation,
- identity management.

How to get started:
- Run the client contract dapp on node.js and open in browser (Chrome tested)
- Login to your Metamask wallet plugin, select ropsten testnet and open contact client.
- For this demo you will test ethereum account with some ether balance to confirm transactions.
- Read and select checkboxes for some articles.
- Click on the "Sign and engrave" button to sign transaction with Metamask. After few blocks the data are permanently stored in this particular smart contract.
- You can come back at any time to check your approvals of selected articles or you can do this by checking network explorer.
- [Admin mode] To manage smart contracts token balance (e.g for potential access control) for users and add articles you can click on settings icon no top right corner of contract client. You have to be the owner of smart contract to access this functions.

How to deploy your own smartcontract with client dapp on ropsten testnet:
- Simply copy the contained smart contract(modify if needed) and paste it to remix.ethereum.org.
- Click "Run" > "Create". You can view created smartcontract address on created instance.
- Under "Compile" get "Details", check ABI
- Copypaste smart contract address and ABI to correct lines in script.js and script-admin.js (watch for comments).
- Run client on node.js and open client contract dapp.
- You can start by creating new articles for your users to check in admin mode.

Platforms and libraries used:
- Node.js with Express
- Web3.js javascript interface for Ethereum blockchain
- Remix.ethereum.org Solidity IDE and smart contract deployment on testnet
- jQuery, MaterializeCSS with Google Material design icons
