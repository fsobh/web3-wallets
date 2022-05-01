import React, { useState, createContext } from 'react';
import {
  ConnectWalletIconsw1,
	ConnectWalletIconsw2,
  Coinbase,
  Formatic,
  Portis
} from '../assets/index'

export const UserContext = createContext();
export const UserInfoProvider = ({children, allowedWallets,allowedNetworks, formaticOptions, portisOptions, coinbaseOptions}) => {

  
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
              case 'coinbase': {
                if(coinbaseOptions && coinbaseOptions.appName && coinbaseOptions.jsonrpc && coinbaseOptions.defaultChain){
                  otherWalletSettings.coinbase = coinbaseOptions;
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

          const _indexPortis = WalletOptions.map(function(e) { return e.id; }).indexOf('portis');

          WalletOptions.splice(_indexPortis,1);
        
        }
         
        if(!formaticOptions || (!formaticOptions.key || !formaticOptions.network)){

          const _indexFormatic = WalletOptions.map(function(e) { return e.id; }).indexOf('formatic');
          
          WalletOptions.splice(_indexFormatic,1);
        
        }

        if(!coinbaseOptions ||( !coinbaseOptions.appName || !coinbaseOptions.jsonrpc || !coinbaseOptions.defaultChain)){

          const _indexCoinbase = WalletOptions.map(function(e) { return e.id; }).indexOf('coinbase');

          WalletOptions.splice(_indexCoinbase,1);
        }
        
      

        selectedWallets = WalletOptions;
       
      }
  }
  else {

    if(!portisOptions || (!portisOptions.key || !portisOptions.network)){

      const _indexPortis = WalletOptions.map(function(e) { return e.id; }).indexOf('portis');

      WalletOptions.splice(_indexPortis,1);
    
    }
     
    if(!formaticOptions || (!formaticOptions.key || !formaticOptions.network)){

      const _indexFormatic = WalletOptions.map(function(e) { return e.id; }).indexOf('formatic');
      
      WalletOptions.splice(_indexFormatic,1);
    
    }

    if(!coinbaseOptions ||( !coinbaseOptions.appName || !coinbaseOptions.jsonrpc || !coinbaseOptions.defaultChain)){

      const _indexCoinbase = WalletOptions.map(function(e) { return e.id; }).indexOf('coinbase');

      WalletOptions.splice(_indexCoinbase,1);
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
    coinbaseOptions : otherWalletSettings.coinbase,
    portisOptions   : otherWalletSettings.portis,
    formaticOptions : otherWalletSettings.formatic,
    wallets : selectedWallets,
    
  });

  const commitTransaction = () =>

  new Promise(async (resolve, reject) => {



    //check authentication state
   if(connectedWallet.account && connectedWallet.isAuthenticated && connectedWallet.protocal &&
     (typeof props.account === 'string' || 
     props.account instanceof String)){
        

        switch(props.Protocal){

            case 'metamask' : {

              if (!window || !window.ethereum)
                reject({Message : `No Injection Found` , code : 400})

                const web3 = new Web3(props.Connector);
                
                

                if (!web3)
                  reject({Message : `Web3 Error` , code : 400})
              
                const transactionParameters = {
                  to: AddressHolder.Factory.Address, // Required except during contract publications.
                  from: props.account, // must match user's active address.
                  
                  value: parseInt(Web3.utils.toWei("0.05", 'ether')).toString(16), // MAKE SURE TO CONVERT THIS TO HEX --- Only required to send ether to the recipient from the initiating external account.
                  data: web3.eth.abi.encodeFunctionCall(    
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        }
                      ],
                      "name": "Mint",
                      "outputs": [],
                      "stateMutability": "payable",
                      "type": "function"
                    },[props.account]
                ),
                  chainId: `0x${parseInt(props.network)}`, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
                };

 
                await window.ethereum.request({
                  method: 'eth_sendTransaction',
                  params: [transactionParameters],
                }).then( (result) => {

                     resolve(result) 

                }).catch((error)=> reject({code :5503 , Message : `Rejected : ${error}`}))

                break
            }
            case 'walletconnect' : { 

              if(!connectedWallet.Connector)
                reject({code : 4044, Message: "Provider not Found, Check your wallet connection or refresh the page & reconnect"})

            const web3 = new Web3(props.Connector); 

            if (!web3)
              reject({Message : `Web3 Error` , code : 400})

            const customRequest = {
              id: 1337,
              jsonrpc: "2.0",
              method: "eth_sendTransaction",
              params: [
                {
                  to: AddressHolder.Factory.Address, // Required except during contract publications.
                  from: props.account, // must match user's active address. 
                  value: Web3.utils.toWei("0.05", 'ether'), // MAKE SURE TO CONVERT THIS TO HEX --- Only required to send ether to the recipient from the initiating external account.
                  
                  data: web3.eth.abi.encodeFunctionCall(    
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        }
                      ],
                      "name": "Mint",
                      "outputs": [],
                      "stateMutability": "payable",
                      "type": "function"
                    },[props.account]
                ),
                }
              ],
            };

              // Send transaction
              
                props.Connector.sendCustomRequest(customRequest)
                .then((result) => {
                  // Returns transaction id (hash)
                  resolve(result) 
                })
                .catch((error) => {
                  // Error returned when rejected
                  console.error(error);
                  reject({code :5503 , Message : `Rejected : ${error}`})
                });

              break
            }
            case 'trezor' : {

              try {
                const web3 = new Web3(props.Connector); 

                if (!web3)
                  reject({Message : `Web3 Error` , code : 400})

              console.log(props)
              const rawTx = {
                to: "0x234094098889dAa77DE94E46af7382ba18e14C67",
                value: parseInt(Web3.utils.toWei("0.05", 'ether')).toString(16),
                data: web3.eth.abi.encodeFunctionCall(    
                  {
                    "inputs": [
                      {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                      }
                    ],
                    "name": "Mint",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                  },[props.account]
              ),
                chainId: 1,
                nonce: web3.utils.toHex(props.trezorNonce),
                gasLimit: "0x5208",
                gasPrice: web3.utils.toHex(web3.eth.getGasPrice()),
              
                }

                props.Connector.ethereumSignTransaction({
                  path: "m/44'/60'/0'",
                  transaction: rawTx
              });
            } catch (error) {
              console.error(error)
            }

                break
            }
            case 'portis' : {

              if(!props.Connector )
                  reject({code : 4044, Message: "Provider not Found, Check your wallet connection or refresh the page & reconnect"})
              const web3 = new Web3(props.Connector); 

              if (!web3)
                  reject({Message : `Web3 Error` , code : 400})

              const rawTx = {
                  to: AddressHolder.Factory.Address,
                  from: props.account, 
                  value: parseInt(Web3.utils.toWei("0.05", 'ether')).toString(16), 
                  data: web3.eth.abi.encodeFunctionCall(    
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        }
                      ],
                      "name": "Mint",
                      "outputs": [],
                      "stateMutability": "payable",
                      "type": "function"
                    },[props.account]
                )
                  }

                  
                    
                     await props.Connector.currentProvider.send("eth_sendTransaction", [
                      rawTx
                    ]).then((result)=>{

                      resolve(result) 
                      
                    }).catch((err)=>{

                      console.error(err);
                      reject({code :5503 , Message : `Rejected : ${err}`})
                    })
 
                break
            }
            case 'coinbase' : {


              if(!props.Connector )
              reject({code : 4044, Message: "Provider not Found, Check your wallet connection or refresh the page & reconnect"})

              const web3 = new Web3(props.Connector); 

              if (!web3)
                  reject({Message : `Web3 Error` , code : 400})

              const rawTx = {
                  to: AddressHolder.Factory.Address,
                  from: props.account, 
                  value: parseInt(Web3.utils.toWei("0.05", 'ether')).toString(16), 
                  data: web3.eth.abi.encodeFunctionCall(    
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        }
                      ],
                      "name": "Mint",
                      "outputs": [],
                      "stateMutability": "payable",
                      "type": "function"
                    },[props.account]
                )
                  }

                     await props.Connector.send("eth_sendTransaction", [
                      rawTx
                    ]).then((result)=>{

                      resolve(result) 
                      
                    }).catch((err)=>{

                      console.error(err);
                      reject({code :5503 , Message : `Rejected : ${err}`})
                    })

            // Send transaction
            
              

            break

            }
            case 'formatic' : {

              if(!props.Connector )
              reject({code : 4044, Message: "Provider not Found, Check your wallet connection or refresh the page & reconnect"})
          
          const web3 = new Web3(props.Connector); 

          if (!web3)
                reject({Message : `Web3 Error` , code : 400})

          const rawTx = {
              to: AddressHolder.Factory.Address,
              from: props.account, 
              value: Web3.utils.toWei("0.05", 'ether'), 
              data: web3.eth.abi.encodeFunctionCall(    
                {
                  "inputs": [
                    {
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                    }
                  ],
                  "name": "Mint",
                  "outputs": [],
                  "stateMutability": "payable",
                  "type": "function"
                },[props.account]
                )
            }

              
                
                 await props.Connector.eth.sendTransaction(rawTx,(error,txnHash)=>
                 {
                  if (error) 
                    reject({code :5503 , Message : `Rejected : ${error}`})

                  resolve(txnHash) 
                 })

                break
            }

            default :
                console.log("ass")


        }




    }

  });



  return(
    <UserContext.Provider value={[connectedWallet, setWallet,commitTransaction]}>
      {children}
    </UserContext.Provider>
  )
}