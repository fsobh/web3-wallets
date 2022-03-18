import React, { useState, createContext } from 'react';
export const UserContext = createContext();
export const UserInfoProvider = (props) => {
  
  const [connectedWallet, setWallet] = useState({
    account: null,
    selectedNetwork: false,
    isAuthenticated: false,
    protocal: false,
    Connector: false,
    allowedNetworks : [1,4],
    logout : false,
    portisOptions   : {

      key :  '74a7ec07-631d-4579-93d1-7bfa6b1a2e03', 
      network :  'mainnet'
     },
     formaticOptions : {
 
       key :  'pk_test_25E2ADA8B773A4CB', 
       network :  'rinkeby'
     }


  });

  return(
    <UserContext.Provider value={[connectedWallet, setWallet]}>
      {props.children}
    </UserContext.Provider>
  )
}