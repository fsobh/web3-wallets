import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Web3 from 'web3'
import  fetchNetworkNameByID  from '../Utils';

async function listenCoinbaseAccount(ethereum, current,set){

    // Initialize a Web3 object
try {

 const web3 = new Web3(ethereum)

 ethereum.enable().then(async (accounts) => {

 
  const network = await web3.eth.getChainId()
  let auth = false;

  if (current.allowedNetworks.includes(network))
      auth = true; 
    
  
    if (accounts && accounts[0])
      set({
          ...current,
          account: accounts[0],
          selectedNetwork: network,
          networkName : fetchNetworkNameByID(network),
          isAuthenticated: auth,
          protocal: "coinbase",
          Connector: ethereum,
      });
    else 
      set({
        ...current,
        account: false,
        selectedNetwork: false,
        networkName : false,
        isAuthenticated: false,
        protocal: false,
        Connector: false,
      });
})





ethereum.on('chainChanged', async function (chainId) {
 
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
        networkName : fetchNetworkNameByID(chainIDDecimal),
        isAuthenticated: auth,
        protocal: "coinbase",
        Connector: ethereum,
      });
    else 
       set({
         ...current,
         account: false,
         selectedNetwork: false,
         networkName : false,
         isAuthenticated: false,
         protocal: false,
         Connector: false,
        });

});


ethereum.on('accountsChanged', async function (accounts) {
  
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

window.addEventListener("beforeunload", async (ev) => {
  
        await ethereum.disconnect();

        set({
            ...current,
            account: false,
            selectedNetwork: false,
            networkName : false,
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
    networkName : false,
    protocal: false,
    Connector: false,
});
  
}


}
export default async function connectCoinBaseWallet(current,set,disconnect = false){

try {



const APP_NAME = current.coinbaseOptions.appName
const APP_LOGO_URL =  current.coinbaseOptions.logo || 'https://example.com/logo.png'
const DEFAULT_ETH_JSONRPC_URL = current.coinbaseOptions.jsonrpc
const DEFAULT_CHAIN_ID = current.coinbaseOptions.defaultChain

// Initialize Coinbase Wallet SDK
 const coinbaseWallet = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false
})




  if(disconnect)
    return coinbaseWallet.disconnect()

    


    const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)

   

    await listenCoinbaseAccount(ethereum,current,set)

} catch (error) {
  console.log(error)
}

}
