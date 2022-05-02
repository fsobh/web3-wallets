import React from 'react'
import  {WalletContext}  from 'web3-wallets'
import 'web3-wallets/dist/index.css'
import Nav from '../Components/Nav'
const Network = () => {
  const {connectedWallet} = React.useContext(WalletContext)

  return <div><Nav/><br/><h1>{connectedWallet.selectedNetwork || 'not connected'}</h1></div>
}
export default Network;