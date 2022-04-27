import React from 'react'

import  {WalletButton, WalletContext}  from 'web3-wallets'
import 'web3-wallets/dist/index.css'

const App = () => {

  const [connectedWallet] = React.useContext(WalletContext)

  console.log(connectedWallet.Connector)
  
  return <WalletButton />
}

export default App
