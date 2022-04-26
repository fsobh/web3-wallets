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
  let otherWalletSettings = {
    portis   : {  // https://docs.portis.io/#/configuration

      key :  '', 
      network :  'mainnet'
     },
    formatic : { // https://docs.fortmatic.com/web3-integration/network-configuration#switch-network-on-testnet
       key :  '', 
       network :  'mainnet'
     },
  }
 
  if (allowedWallets && Array.isArray(allowedWallets)){
      allowedWallets.forEach((item) => {
       
        let found = WalletOptions.find(element => element.id === item);
        
        if(found)

            switch(found.id){

              case 'formatic': {

                if(formaticOptions && formaticOptions.key && formaticOptions.network){
                  otherWalletSettings.formatic = formaticOptions;
                  selectedWallets.push(found);
                }
                break;
              }
              case 'portis': {
                if(portisOptions && portisOptions.key && portisOptions.network){
                  otherWalletSettings.portis = portisOptions;
                  selectedWallets.push(found);
                }
                break;
              }
              default: {
                selectedWallets.push(found);
                break;
              }

            }
      })
      
      if(selectedWallets.length === 0){

        if(!portisOptions || (!portisOptions.key || !portisOptions.network)){

          WalletOptions.pop();

          if(!formaticOptions || (!formaticOptions.key || !formaticOptions.network))
              WalletOptions.pop(); 
        }
        else{

          if(!formaticOptions || (!formaticOptions.key || !formaticOptions.network)) 
          {
            const _indexFormatic = WalletOptions.map(function(e) { return e.id; }).indexOf('formatic');
            const _indexPortis = WalletOptions.map(function(e) { return e.id; }).indexOf('portis');
            WalletOptions[_indexFormatic] = WalletOptions[_indexPortis];
            WalletOptions.pop()

          }
      }


         
        selectedWallets = WalletOptions;
        //check if portis and formatic creds were provided
      }
  }
  else {

    if(!portisOptions || (!portisOptions.key || !portisOptions.network)){

      WalletOptions.pop();

      if(!formaticOptions || (!formaticOptions.key || !formaticOptions.network))
          WalletOptions.pop();
    }
    else{

      if(!formaticOptions || (!formaticOptions.key || !formaticOptions.network)) 
      {
    
        const _indexFormatic = WalletOptions.map(function(e) { return e.id; }).indexOf('formatic');
        const _indexPortis = WalletOptions.map(function(e) { return e.id; }).indexOf('portis');
        WalletOptions[_indexFormatic] = WalletOptions[_indexPortis];
        WalletOptions.pop()
      }
  }
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
    portisOptions   : otherWalletSettings.portis,
    formaticOptions : otherWalletSettings.formatic,
    wallets : selectedWallets,
    
  });

  return(
    <UserContext.Provider value={[connectedWallet, setWallet]}>
      {children}
    </UserContext.Provider>
  )
}