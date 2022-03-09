import Web3 from "web3";
import WalletLink from 'walletlink'

async function listenCoinbaseAccount(ethereum){

    // Initialize a Web3 object
try {



 const web3 = new Web3(ethereum)

 ethereum.send('eth_requestAccounts').then(async (accounts) => {


  if(accounts && accounts[0]){
  props.onAcountChange(accounts[0], true, "coinbase",ethereum);
  props.onNetworkChange(await web3.eth.getChainId(), true, "coinbase",ethereum);
  }
})



ethereum.on('chainChanged', async function (chainId) {
  const chainIDDecimal = parseInt(chainId, 16);

  if (chainIDDecimal !== getAllowedNetwork()) {
    //must be on mainnet or Testnet (Web3 returns it as a decimal, thats why im converting ) - window.ethereum returns it as a hex
    props.onNetworkChange(chainIDDecimal, false, "coinbase",ethereum);
  } else {
    props.onNetworkChange(chainIDDecimal, true, "coinbase",ethereum);
  }
});


ethereum.on('accountsChanged', async function (accounts) {
  console.log(accounts);

  const network = await web3.eth.getChainId()

  if (network !== getAllowedNetwork()) {
    //must be on mainnet or Testnet
    props.onNetworkChange(network, false, "coinbase",ethereum);
  } else {
    //Do this check to ddetect if the user disconnected their wallet from the Dapp
    if (accounts && accounts[0]) props.onAcountChange(accounts[0], true, "coinbase",ethereum);
    else {
      /*
    @Arg1 : account address (String)
    @Arg2 : isAuthenticated (bool) 
  */
      props.onAcountChange(false, false,false,false);
      props.onNetworkChange(false, false,false,false);
    }
  }
});

window.addEventListener("beforeunload", (ev) => {
  
        ethereum.disconnect()
  
});

} catch (error) {
  
  console.log(error)
}


}
export default async function connectCoinBaseWallet(disconnect = false){

try {
  

const APP_NAME = 'Open RPG'
const APP_LOGO_URL = 'https://example.com/logo.png'
const ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/2d50c035b508455dbc6f58d4dc8a217c'
const CHAIN_ID = getAllowedNetwork()

// Initialize WalletLink
const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: true,
  overrideIsMetaMask : true,
  
  
})



if(walletLink){

// Initialize a Web3 Provider object
 const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID)

 if(ethereum && ethereum.isConnected() && props.authenticated && disconnect){

  ethereum.disconnect()

  props.onAcountChange(false, false,false);
  props.onNetworkChange(false, false,false);
  toast.info('Coinbase wallet disconnected  ', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    return

 }
 
 

 if(ethereum && ethereum.isConnected())
    await listenCoinbaseAccount(ethereum)

}

} catch (error) {
  console.log(error)
}

}
