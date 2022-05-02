import './index.css'
import {WalletProvider} from 'web3-wallets'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// TODO: Implement transactions based off this : https://github.com/superior-programmers/OpenRPG/blob/prod/Frontend/src/utils/commitTransaction.js

ReactDOM.render(
<WalletProvider  
    allowedWallets={[
        "metamask",
        "walletconnect",
        "coinbase",  //
        "formatic", //
        "portis"   // 
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
    
    }}>
    
    <App />
</WalletProvider>, document.getElementById('root'))
