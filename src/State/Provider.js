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

    portisOptions   : {

     key :  'cvbcvbcvbcvb', 
     network :  'mainnet'
    },
    formaticOptions : {

      key :  'pk_test_ghjghj', 
      network :  'rinkeby'
    }


  });

  return(
    <UserContext.Provider value={[connectedWallet, setWallet]}>
      {props.children}
    </UserContext.Provider>
  )
}