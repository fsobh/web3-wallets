import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import Web3 from 'web3'

async function listenCoinbaseAccount(ethereum, current,set){

    // Initialize a Web3 object
try {



 const web3 = new Web3(ethereum)

//  ethereum.on('eth_requestAccounts').then(async (accounts) => {

//   console.log("as")
//   const network = await web3.eth.getChainId()
//   let auth = false;

//   if (current.allowedNetworks.includes(network))
//       auth = true; 
    
  
//     if (accounts && accounts[0])
//       set({
//           ...current,
//           account: accounts[0],
//           selectedNetwork: network,
//           isAuthenticated: auth,
//           protocal: "coinbase",
//           Connector: ethereum,
//       });
//     else 
//       set({
//         ...current,
//         account: false,
//         selectedNetwork: false,
//         isAuthenticated: false,
//         protocal: false,
//         Connector: false,
//       });
// })



ethereum.on('chainChanged', async function (chainId) {
  console.log("sd")
  const chainIDDecimal = parseInt(chainId, 16);

  let auth = false;

  if (current.allowedNetworks.includes(chainIDDecimal))
      auth = true; 
    
    const accounts = await web3.eth.getAccounts()
  
    if (accounts && accounts[0])
      set({
        ...current,
        account: accounts[0],
        selectedNetwork: chainIDDecimal,
        isAuthenticated: auth,
        protocal: "coinbase",
        Connector: ethereum,
      });
    else 
       set({
         ...current,
         account: false,
         selectedNetwork: false,
         isAuthenticated: false,
         protocal: false,
         Connector: false,
        });

});


ethereum.on('accountsChanged', async function (accounts) {
  
  console.log("whyyy")
  const network = await web3.eth.getChainId()
  let auth = false;

  if (current.allowedNetworks.includes(network))
      auth = true; 
    
  
    if (accounts && accounts[0])
      set({
        ...current,
        account: accounts[0],
        selectedNetwork: network,
        isAuthenticated: auth,
        protocal: "coinbase",
        Connector: ethereum,
      });
    else 
       set({
         ...current,
         account: false,
         selectedNetwork: false,
         isAuthenticated: false,
         protocal: false,
         Connector: false,
        });
});

window.addEventListener("beforeunload", (ev) => {
  
        ethereum.disconnect();

        set({
            ...current,
            account: false,
            selectedNetwork: false,
            isAuthenticated: false,
            protocal: false,
            Connector: false,
        });
  
});

} catch (error) {
  
  console.log(error);
  set({
    ...current,
    account: false,
    selectedNetwork: false,
    isAuthenticated: false,
    protocal: false,
    Connector: false,
});
  
}


}
export default async function connectCoinBaseWallet(current,set){

try {
  
const APP_NAME = 'Your APP'
const DEFAULT_ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/29697ff0dc574effbd5f5e104a845ed0'


// Initialize WalletLink
// Initialize Coinbase Wallet SDK
const coinbaseWallet = new WalletLinkConnector({
  appName: APP_NAME,
  supportedChainIds: current.allowedNetworks,
  url : DEFAULT_ETH_JSONRPC_URL
})


await coinbaseWallet.activate().then(async (provider)=> {


  

  await listenCoinbaseAccount(await coinbaseWallet.getProvider(),current,set)
      

  


})
// Initialize a Web3 Provider object
//const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)

//await listenCoinbaseAccount(ethereum,current,set)



//  if(ethereum && ethereum.isConnected() && props.authenticated && disconnect){

//   ethereum.disconnect()

//     set({
//             ...current,
//             account: false,
//             selectedNetwork: false,
//             isAuthenticated: false,
//             protocal: false,
//             Connector: false,
//     });
//     return

//  }
 
 


    



} catch (error) {
  console.log(error)
}

}
