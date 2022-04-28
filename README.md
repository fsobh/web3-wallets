<p align="center" style="border-radius:50%">
    <a href="https://aws.amazon.com" title="W3 Wallets" style="border-radius:50%">
        <img  height=230px src="https://open-rpg-images.s3.us-east-2.amazonaws.com/web3blue.jpg" alt="W3 Wallets" style="border-radius:50%" >
    </a>
</p>

<div align="center">

# Web3 wallets (React.js)
### Integrate Web3 Wallets into your Dapp with just a few lines of code


   [![JavaScript](https://img.shields.io/badge/JavaScript-%23FFFF00)](https://img.shields.io/badge/JavaScript-%23FFFF00)    [![ReactJS](https://img.shields.io/badge/-ReactJS-cyan)](https://img.shields.io/badge/-ReactJS-cyan) 
   [![MetaMask](https://img.shields.io/badge/Meta%20Mask-wallet-orange)](https://img.shields.io/badge/Meta%20Mask-wallet-orange) 
   [![Formatic](https://img.shields.io/badge/Formatic-wallet-%236851FF)](https://img.shields.io/badge/Formatic-wallet-%236851FF) 
   [![Coinbase](https://img.shields.io/badge/Coinbase-wallet-blue)](https://img.shields.io/badge/Coinbase-wallet-blue)
   [![Walletconnect](https://img.shields.io/badge/Wallet%20connect-wallet-red)](https://img.shields.io/badge/Wallet%20connect-wallet-red)
   [![Portis](https://img.shields.io/badge/Portis-wallet-%237e33ee)](https://img.shields.io/badge/Portis-wallet-%237e33ee)
   

</div>


## Installation
####  Install the Package

```bash
  npm install web3-wallets
```

## Import the module Provider in Index.js

```javascript
 import { WalletProvider } from 'web3-wallets'
```

## Wallet Provider props
| Parameter | Type                | Description                       |
| :------- | :------------------- | :--------------------------------  |
| `allowedWallets`   |  `Array`   | **Optional**. List of wallets you want available in your Dapp : ` metamask , walletconnect , coinbase , formatic , portis `. Defaults to all (excluding portis and formatic **UNLESS** you provided their configurations in `formaticOptions` & `portisOptions` ) |
| `allowedNetworks`  |  `Array`   | **Optional**. List of networks your Dapp should support (chain ID's). Defaults to `[1,4]` (mainnet & rinkeby) |
| `formaticOptions`  |  `Object`  | **Required if**.  you want formatic as an option for wallet use. ex : `{key : "<you-api-key>", network : "mainnet"}`  |
| `portisOptions`    |  `Object`  | **Required if**.  you want portis as an option for wallet use. ex : `{key : "<you-api-key>", network : "mainnet"}`  |

### Example

```javascript

import React from 'react'
import ReactDOM from 'react-dom'
import { WalletProvider } from 'web3-wallets'
import App from './App'

ReactDOM.render(
<WalletProvider  >
    <App />
</WalletProvider>, document.getElementById('root'))

```



