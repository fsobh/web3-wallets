import Portis from '@portis/web3';
import Web3 from 'web3'
//Portis functions
const listenPortisAccount = async (portis,web3) => {
    try {
  
   portis.onError(error => {
        console.log('error', error);
     
      });
      
      portis.onLogin(async (walletAddress, email, reputation) => {
        
        console.log(walletAddress, email, reputation);
  
        props.onAcountChange(walletAddress, true, "portis",web3.eth)
  
        const network = await web3.eth.getChainId()
  
        if (network !== getAllowedNetwork()) {
          //must be on mainnet or Testnet
          props.onNetworkChange(network, false, "portis",web3.eth);
        }
        else
          web3.eth.getChainId().then((id)=> props.onNetworkChange(id, true, "portis",web3.eth));
  
          
      })
  
      portis.onLogout(() => {
        
        props.onAcountChange(false, false,false,false);
        props.onNetworkChange(false, false,false,false);
      });
  
      
      
      portis.onActiveWalletChanged(async walletAddress => {
  
        props.onAcountChange(walletAddress, true, "portis",web3.eth)
  
        const network = await web3.eth.getChainId()
  
        if (network !== getAllowedNetwork()) {
          //must be on mainnet or Testnet
          props.onNetworkChange(network, false, "portis",web3.eth);
        }
        else
          web3.eth.getChainId().then((id)=> props.onNetworkChange(id, true, "portis",web3.eth));
      })
  
    } catch (error) {
      console.log('error', error);
      
    }
  
  
  
  }
  
  export default async function connectPortis(disconnect = false) {
    try {
     
  
        
      const portis = new Portis('74a7ec07-631d-4579-93d1-7bfa6b1a2e03', getAllowedNetwork() === 4 ? 'rinkeby' : 'mainnet');
      const web3 = new Web3(portis.provider);
  
      if(web3 && web3.eth){
  
        if (disconnect && props.authenticated && (await portis.isLoggedIn()).result){
  
          await portis.logout()
  
          props.onAcountChange(false, false,false);
          props.onNetworkChange(false, false,false);
        
      }
        
  
        web3.eth.getAccounts().then(async(accounts)=> {
         
  
          if(accounts && accounts[0])
          {
  
          props.onAcountChange(accounts[0], true, "portis",web3.eth)
          const network = await web3.eth.getChainId()
          
          
          if (network !== getAllowedNetwork()) {
            //must be on mainnet or Testnet
            props.onNetworkChange(network, false, "portis",web3.eth);
          }
          else
            web3.eth.getChainId().then((id)=> props.onNetworkChange(id, true, "portis",web3.eth));
    
         
          await listenPortisAccount(portis,web3)
    
        window.addEventListener("beforeunload", async (ev) => {
        
          await portis.logout()
    
          props.onAcountChange(false, false,false,false);
          props.onNetworkChange(false, false,false,false);
          
        });
          
          
          }
      
      
        })
  
      }
  
  
    } catch (error) {
      
    }
  
  }