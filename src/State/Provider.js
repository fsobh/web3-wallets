import React, { useState, createContext } from 'react';
import {
  ConnectWalletIconsw1,
	ConnectWalletIconsw2,
  Coinbase,
  Formatic,
  Portis
} from '../assets/index'

export const UserContext = createContext();
export const UserInfoProvider = ({children, allowedWallets,allowedNetworks, formaticOptions, portisOptions}) => {

  
  let WalletOptions = [
      {img:ConnectWalletIconsw1,text:'MetaMask', id : 'metamask'},
      {img:ConnectWalletIconsw2,text:'Wallet Connect' , id : 'walletconnect'},
      {img:Coinbase,text:'Coinbase Wallet', id : "coinbase"},
      {img:Formatic,text:'Formatic', id : "formatic"},
      {img:Portis,text:'Portis', id : "portis"},
 
  ]
  let selectedWallets = []
  let selectedNetworks = []
 
  if (allowedWallets && Array.isArray(allowedWallets)){
      allowedWallets.forEach((item) => {
       
        let found = WalletOptions.find(element => element.id === item);
        
        if(found)

          //check if keys and network names were passed in


          selectedWallets.push(found)
      })
      
      if(selectedWallets.length === 0)
         selectedWallets = WalletOptions;

  }
  else {
    selectedWallets = WalletOptions;
  }

  if (allowedNetworks && Array.isArray(allowedNetworks) && allowedNetworks.length > 0)
    selectedNetworks = allowedNetworks
  else 
    selectedNetworks = [1,4];
  
  
  const [connectedWallet, setWallet] = useState({
    account: null,
    selectedNetwork: false,
    isAuthenticated: false,
    protocal: false,
    Connector: false,
    allowedNetworks : selectedNetworks,
    portisOptions   : {  // https://docs.portis.io/#/configuration
      key :  '74a7ec07-631d-4579-93d1-7bfa6b1a2e03', 
      network :  'mainnet'
     },
    formaticOptions : { // https://docs.fortmatic.com/web3-integration/network-configuration#switch-network-on-testnet
 
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