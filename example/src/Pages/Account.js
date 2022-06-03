import React from 'react'
import  {WalletContext}  from 'web3-wallets-react'
import 'web3-wallets-react/dist/index.css'
import Nav from '../Components/Nav'
const Account = () => {
  const {connectedWallet} = React.useContext(WalletContext)

  return <div><Nav/><br/><h1>{connectedWallet.account || 'not connected'}</h1></div>
}
export default Account;