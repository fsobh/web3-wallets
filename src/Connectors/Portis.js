import Portis from '@portis/web3';
import Web3 from 'web3'
//Portis functions
const listenPortisAccount = async (portis,web3,current,set) => {
    try {
  
  portis.onError(error => {
        console.log('oh fuckkkkk', error);
          set({
            ...current,
            account: false,
            selectedNetwork: false,
            isAuthenticated: false,
            protocal: false,
            Connector: false,
          });
        
     
      });
      
      //  portis.onLogin(async (walletAddress, email, reputation) => {
 
        
      //   set({
      //     ...current,
      //     account: walletAddress,
      //     isAuthenticated: true,
      //     protocal: "portis",
      //     Connector: web3.eth,
      //   });
  
      //   const network = await web3.eth.getChainId()
  
      //   if (!current.allowedNetworks.includes(network)){
      //     //must be on mainnet or Testnet
      //     set({
      //       ...current,
      //       account: walletAddress,
      //       selectedNetwork: network,
      //       isAuthenticated: false,
      //       protocal: "portis",
      //       Connector: web3.eth,
      //     });
      //   }
      //   else
      //     web3.eth.getChainId().then((id)=> set({
      //       ...current,
      //       account: walletAddress,
      //       selectedNetwork: id,
      //       isAuthenticated: false,
      //       protocal: "portis",
      //       Connector: web3.eth,
      //     }));
  
          
      // }).catch((e)=>{consolee.log("ohfukkkk")})
  
      portis.onLogout(() => {
        
        set({
          ...current,
          account: false,
          selectedNetwork: false,
          isAuthenticated: false,
          protocal: false,
          Connector: false,
        });
      });
  
      
      
      portis.onActiveWalletChanged(async walletAddress => {
  
       
  
        const network = await web3.eth.getChainId()


  
        if (!current.allowedNetworks.includes(network)){
          //must be on mainnet or Testnet
          set({
            ...current,
            account: walletAddress,
            selectedNetwork: network,
            isAuthenticated: false,
            protocal: "portis",
            Connector: web3.eth,
          });
        }
        else
          web3.eth.getChainId().then((id)=> set({
            ...current,
            account: walletAddress,
            selectedNetwork: id,
            isAuthenticated: true,
            protocal: "portis",
            Connector: web3.eth,
          }));
      })
  
    } catch (error) {
      console.log('error', error);
      
    }
  
  
  
  }
  
  export default async function connectPortis(current,set, setError,close, disconnect = false) {
   

    try {
     
      if (!current.portisOptions.key || !current.portisOptions.network)
        throw new Error("Key or Network not provided");
        
      let portis = new Portis(current.portisOptions.key, current.portisOptions.network);


      const web3 = new Web3(portis.provider);


  
      if(web3 && web3.eth){
        
  
        if (disconnect){
  
          await portis.logout()
  
          set({
            ...current,
            account: false,
            selectedNetwork: false,
            isAuthenticated: false,
            protocal: false,
            Connector: false,
          });

          close(true)
          setError({isOpen:false})

          return
        
      }
        
 
        const accounts = await web3.eth.getAccounts()
         
        close(false)
        setError({isOpen:true})
          
  
          if(accounts && accounts[0])
          {
  
        
          set({
            ...current,
            account: accounts[0],
            isAuthenticated: true,
            protocal: "portis",
            Connector: web3.eth,
          });
          
          const network = await web3.eth.getChainId()
          
          
          if (!current.allowedNetworks.includes(network)){
            //must be on mainnet or Testnet
            set({
              ...current,
              account: accounts[0],
              selectedNetwork: network,
              isAuthenticated: true,
              protocal: "portis",
              Connector: web3.eth,
            });
          }
          else
            web3.eth.getChainId().then((id)=> 
              set({
                ...current,
                account: accounts[0],
                selectedNetwork: id,
                isAuthenticated: true,
                protocal: "portis",
                Connector: web3.eth,
            }));
    
         
          await listenPortisAccount(portis,web3,current,set)
            
          }

          close(false)
          setError({isOpen:false})
     
           window.addEventListener("beforeunload", async (ev) => {
        
          await portis.logout()
    
          set({
            ...current,
            account: false,
            selectedNetwork: false,
            isAuthenticated: false,
            protocal: false,
            Connector: false,
          });
          
        });
  
      }
  
     
    } catch (error) {
      console.log(error);
        close(false); 
        setError({isOpen : true, message : `${error.message}`, type : 'error'});
      }


   }
  
  