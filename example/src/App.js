import React from 'react'

import  {WalletButton, WalletContext}  from 'web3-wallets'
import 'web3-wallets/dist/index.css'

const App = () => {

  const {connectedWallet, commitTransaction} = React.useContext(WalletContext)

  console.log(connectedWallet.Connector)
  
  return <div ><WalletButton /> <br/> <button onClick={async ()=>await commitTransaction("0x2cbA00e6e4F6A5e6A0a2DBeDdBd56312994D36C9","0.05")}> transact </button></div>
}

export default App
