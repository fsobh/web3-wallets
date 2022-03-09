import Fortmatic from 'fortmatic';

import Web3 from 'web3'
export default async function connectFormatic(disconnect = false) {
    try {
      setLoading({state:true,wallet:'Formatic'})
      setError({state:false,error:``})
      const fm = new Fortmatic('pk_test_25E2ADA8B773A4CB', getAllowedNetwork() === 4 ? 'rinkeby' : 'mainnet');
      console.log(fm)
      window.web3 = new Web3(fm.getProvider());
  
      if (await fm.user.isLoggedIn() && props.authenticated && disconnect){
  
        fm.user.logout().then(() => {
              
          props.onAcountChange(false, false,false,false);
          props.onNetworkChange(false, false,false,false);
  
          toast.info('Formatic disconnected  ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        
        });
        return
      }
      //if()
     
      fm.user.login().then(async () => {
        window.web3.eth.getAccounts().then((accounts)=> props.onAcountChange(accounts[0], true, "formatic",window.web3)); 
        
        const network = await window.web3.eth.getChainId()
  
        if (network !== getAllowedNetwork()) {
          //must be on mainnet or Testnet
          props.onNetworkChange(network, false, "formatic",window.web3);
        }
        else
          window.web3.eth.getChainId().then((id)=> props.onNetworkChange(id, true, "formatic",window.web3));
     
      
      }).catch((e)=>{ 
        
        setLoading({state:false,wallet:''})
        setError({state:true,error:`Formatic user denied access`})
        
        })
    
    
      window.addEventListener("beforeunload", async (ev) => {
      
        if (await fm.user.isLoggedIn()){
  
            fm.user.logout().then(() => {
              
              props.onAcountChange(false, false,false,false);
              props.onNetworkChange(false, false,false,false);
            
            });
        }
      });
    } catch (error) {
      
    }
  }