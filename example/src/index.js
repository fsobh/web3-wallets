import './index.css'
import {WalletProvider} from 'web3-wallets'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
<WalletProvider allowedWallets={[]} allowedNetworks={[]} 
formaticOptions={{
    key : '',
    network : ''
}}
portisOptions={{
    key : '',
    network : ''
}}
>
    <App />
</WalletProvider>, document.getElementById('root'))
