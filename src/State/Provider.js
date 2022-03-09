import React, { useState, createContext } from 'react';
export const UserContext = createContext();
export const UserInfoProvider = (props) => {
  const [connectedWallet, setWallet] = useState({
    account: null,
    selectedNetwork: null,
    isAuthenticated: false,
    protocal: false,
    Connector: false,
    allowedNetworks : [1,4]

  });

  return(
    <UserContext.Provider value={[connectedWallet, setWallet]}>
      {props.children}
    </UserContext.Provider>
  )
}