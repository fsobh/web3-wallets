<p align="center" style="border-radius:50%">
    <a href="https://aws.amazon.com" title="W3 Wallets" style="border-radius:50%">
        <img  height=230px src="https://open-rpg-images.s3.us-east-2.amazonaws.com/web3blue.jpg" alt="W3 Wallets" style="border-radius:50%" >
    </a>
</p>

<div align="center">

# Web3 wallets (React.js)
### Integrate Web3 Wallets into your Dapp with just a few lines of code
#### Wallet state remains consistant throughout Dapp navigation

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
| `allowedWallets`   |  `Array`   | **Optional**. List of wallets you want available in your Dapp : ` metamask , walletconnect , coinbase , formatic , portis `. Defaults to all (excluding portis, formatic, and coinbase **UNLESS** you provided their configurations in `formaticOptions` & `portisOptions` ) |
| `allowedNetworks`  |  `Array`   | **Optional**. List of networks your Dapp should support (chain ID's). Defaults to `[1,4]` (mainnet & rinkeby) |
| `formaticOptions`  |  `Object`  | **Required if**.  you want formatic as an option for wallet use. ex : `{key : "<you-api-key>", network : "mainnet"}`  |
| `portisOptions`    |  `Object`  | **Required if**.  you want portis as an option for wallet use. ex : `{key : "<you-api-key>", network : "mainnet"}`  |
| `coinbaseOptions`    |  `Object`  | **Required if**.  you want coinbase as an option for wallet use. ex : `{ appName: "name of your Dapp", logo : "url to your apps logo", jsonrpc : "<-rpc-url->", defaultChain : 1}`  |

## Example

```javascript
//index.js
import {WalletProvider} from 'web3-wallets'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
<WalletProvider  
    allowedWallets={[
        "metamask",
        "walletconnect",
        "coinbase",  
        "formatic", 
        "portis"   
    ]} 

    allowedNetworks={[
        1,/**mainnet */
        4 /**Rinkeby */ ,
        1030 /**ConFlux espace chain */,
        1666600000 /**Harmony mainnet (shard 0) */
        /** +150 chains registered */]}
    portisOptions = {{

        key: "portis-api-key",
        network : "<network NAME >" /** Heres a list of networks that portis support (make sure to include the network ID in allowedNetworks prop as well) https://docs.portis.io/#/configuration */

    }}
    formaticOptions = {{

        key: "formatic-api-key",
        network : "<network NAME >" /** Heres examples of networks that formatic support (make sure to include the network ID in allowedNetworks prop as well) https://docs.fortmatic.com/web3-integration/network-configuration */

    }}

    coinbaseOptions = {{

        appName: "name of your Dapp",
        logo : "url to your apps logo", /**Optional */
        jsonrpc : "<-rpc-url->",
        defaultChain : 1
    
    }}
>
    <App />
</WalletProvider>, document.getElementById('root'))

```
## App.js

```javascript
//App.js
import React from 'react'
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Account from './Pages/Account';
import Network from './Pages/Network';

const App = () => {

  return ( 
  <BrowserRouter> 
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="net" element={<Network/>} />
      <Route path="acc" element={<Account/>} />
    </Routes>
  </BrowserRouter>);
}

export default App;

```
## Wallet Button usage & creating a transaction

### ```commitTransaction(to, amount, functionABI=false, functionParameters = [])``` 
| Parameter | Type                | Description                       |
| :------- | :------------------- | :--------------------------------  |
| `to`  |  `String`   | **Required**.  |
| `amount`  |  `String`  | **Required**.  |
| `functionABI`  |  `Object`  | **Required if**. |
| `functionParameters`  |  `Array`  | **Required if**. |

```javascript
//Home.js
import React from 'react'
import  {WalletButton,WalletContext}  from 'web3-wallets'
import 'web3-wallets/dist/index.css'
import Nav from '../Components/Nav'
const Home = () => {
  const { commitTransaction} = React.useContext(WalletContext)

  return( 
  <div>
    <Nav/>
      <br/>
      <WalletButton/>
      <br/>
      <button onClick={async ()=> await commitTransaction("0x642dC956a520BbF8A76fc1ec70B2515a8f0A4f89","0.05")}> 
        transact 
      </button>
  </div>
   );
}
export default Home;
```


