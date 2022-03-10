import Fortmatic from 'fortmatic';

import Web3 from 'web3'
export default async function connectFormatic(current,set) {
    try {
    
      if (!current.formaticOptions.key || !current.formaticOptions.network)
          throw new Error("Key or Network not provided");


      const fm = new Fortmatic(current.formaticOptions.key , current.formaticOptions.network);

      window.web3 = new Web3(fm.getProvider());
  
      // if (await fm.user.isLoggedIn() && props.authenticated && disconnect){
  
      //   fm.user.logout().then(() => {
              
      //     set({
      //       ...current,
      //       account: false,
      //       selectedNetwork: false,
      //       isAuthenticated: false,
      //       protocal: false,
      //       Connector: false,
      //     });
      //   });
      //   return
      // }
      //if()
     
      fm.user.login().then(async () => {


        const network = await window.web3.eth.getChainId()

        window.web3.eth.getAccounts().then((accounts)=>{


          if (!current.allowedNetworks.includes(network)){
            
            set({
              ...current,
              account: accounts[0],
              selectedNetwork : id,
              isAuthenticated: false,
              protocal: "formatic",
              Connector: window.web3,
            })
          }
          else
            window.web3.eth.getChainId().then((id)=> 
            set({
                ...current,
                account: accounts[0],
                selectedNetwork : id,
                isAuthenticated: true,
                protocal: "formatic",
                Connector: window.web3,
              })
              );
        })

      }).catch((e)=>{ 
        
        console.error(e);

        set({
          ...current,
          account: false,
          selectedNetwork: false,
          isAuthenticated: false,
          protocal: false,
          Connector: false,
        });
        
        })
    
    
      window.addEventListener("beforeunload", async (ev) => {
      
        if (await fm.user.isLoggedIn()){
  
            fm.user.logout().then(() => {
              
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
      });
    } catch (error) {

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