import React, { useState, createContext } from 'react';
import {
  MetamaskTop,
  WalletConnectTop,
  ConnectWalletIconswallet,
  ConnectWalletIconsw1,
	ConnectWalletIconsw2,
  TrezorLogo,
  Coinbase,
  Formatic,
  Portis
} from '../assets/index'

export const UserContext = createContext();
export const UserInfoProvider = ({children, options}) => {

  
  const [WalletOptions, setOptions] = React.useState({
    metamask :  {img:ConnectWalletIconsw1,text:'MetaMask', id : 'metamask'},
    walletconnect : {img:ConnectWalletIconsw2,text:'Wallet Connect' , id : 'walletconnect'},
    coinbase : {img:Coinbase,text:'Coinbase Wallet', id : "coinbase"},
    formatic : {img:Formatic,text:'Formatic', id : "formatic"},
    portis :   {img:Portis,text:'Portis', id : "portis"},
    // {img:ConnectWalletIconsw3,text:'Ledger'},
    // {img:TrezorLogo,text:'Trezor'},
  })
  if (options && Array.isArray(options)  ){

      options.forEach((item) => {
          

        if (
          typeof WalletOptions === 'object' &&
          !Array.isArray(WalletOptions) &&
          WalletOptions !== null
      ) {
         
          if(!WalletOptions.hasOwnProperty(item)){
            
           
            delete WalletOptions[item.id]
          }

      }
          

      })

  }
  
  const [connectedWallet, setWallet] = useState({
    account: null,
    selectedNetwork: false,
    isAuthenticated: false,
    protocal: false,
    Connector: false,
    allowedNetworks : [1,4],
    portisOptions   : {
      key :  '74a7ec07-631d-4579-93d1-7bfa6b1a2e03', 
      network :  'mainnet'
     },
    formaticOptions : {
 
       key :  'pk_test_25E2ADA8B773A4CB', 
       network :  'rinkeby'
     },
     wallets : WalletOptions,
    
  });

  return(
    <UserContext.Provider value={[connectedWallet, setWallet]}>
      {children}
    </UserContext.Provider>
  )
}