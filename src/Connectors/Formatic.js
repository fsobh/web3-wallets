import Fortmatic from 'fortmatic';

import Web3 from 'web3'
export default async function connectFormatic(current,set, setError, close) {
    try {
    
      if (!current.formaticOptions.key || !current.formaticOptions.network)
          throw new Error("Key or Network not provided");


      const fm = new Fortmatic(current.formaticOptions.key , current.formaticOptions.network);

      close(false)
      setError({isOpen:true})
      window.web3 = new Web3(fm.getProvider());
  
      // if (await fm.user.isLoggedIn()  && disconnect){
  
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

    
     
      await fm.user.login().then(async () => {

     
          
        

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

            setError({isOpen:false})
            close(true)
      }).catch((e)=>{ 
        
        
        console.log(e)
        set({
          ...current,
          account: false,
          selectedNetwork: false,
          isAuthenticated: false,
          protocal: false,
          Connector: false,
        });

        close(false); 
        setError({isOpen : true, message : `${e.message}`, type : 'error'});
        
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
        
          close(false) ; 
          setError({isOpen : false});
          
      
    }
  }