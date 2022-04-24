import React, { useState, createContext } from 'react';
import {
  ConnectWalletIconsw1,
	ConnectWalletIconsw2,
  Coinbase,
  Formatic,
  Portis
} from '../assets/index'

export const UserContext = createContext();
export const UserInfoProvider = ({children, options}) => {

  
  let WalletOptions = [
      {img:ConnectWalletIconsw1,text:'MetaMask', id : 'metamask'},
      {img:ConnectWalletIconsw2,text:'Wallet Connect' , id : 'walletconnect'},
      {img:Coinbase,text:'Coinbase Wallet', id : "coinbase"},
      {img:Formatic,text:'Formatic', id : "formatic"},
      {img:Portis,text:'Portis', id : "portis"},
 
  ]
  let selectedWallets = []

 
  if (options && Array.isArray(options))
  {

    
      options.forEach((item) => {
       
        let found = WalletOptions.find(element => element.id === item);
        
        if(found)
          selectedWallets.push(found)
       
        if(selectedWallets.length === 0)
          selectedWallets = WalletOptions;

      })
  }
  else{
    selectedWallets = WalletOptions;
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
     wallets : selectedWallets,
    
  });

  return(
    <UserContext.Provider value={[connectedWallet, setWallet]}>
      {children}
    </UserContext.Provider>
  )
}