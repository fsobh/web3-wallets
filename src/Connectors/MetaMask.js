import Web3 from "web3";

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    //^ Very motherfucking important - Race conditions == Aids , we are an STD free  - Fadel :)
   
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
       console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
       
        console.log("No web3 instance injected, using Local web3.");
        reject({message : "No web3 instance injected, using Local web3", code : 4003})
      }
   
});

async function listenMMAccount(Ethereum, current,set) {

  try {
    
    window.ethereum.on('accountsChanged', async function (accounts) {
      

      const network = await Ethereum.eth.getChainId();
    
      let auth = false;

      if (current.allowedNetworks.includes(network))
          auth = true; 
        
        if (accounts && accounts[0]) 
          set({
              ...current,
              account: accounts[0],
              selectedNetwork: network,
              isAuthenticated: auth,
              protocal: 'metamask',
              Connector: window.ethereum,
          });
        else {
            set({
              ...current,
              account: false,
              selectedNetwork: false,
              isAuthenticated: false,
              protocal: false,
              Connector: false,
            });
        }
      
    });


    window.ethereum.on('chainChanged', async function (chainId) {
      
      const chainIDDecimal = parseInt(chainId, 16); 
      const addy = await Ethereum.eth.getAccounts();
     

      let auth = false;

      if (current.allowedNetworks.includes(chainIDDecimal))
          auth = true; 
    

      set({
          ...current,
          account: addy[0],
          selectedNetwork: chainIDDecimal,
          isAuthenticated: auth,
          protocal: 'metamask',
          Connector: window.ethereum,
      });

      
    });

    window.ethereum.on('disconnect', function () {
      console.log("ASAA")
      set({
        ...current,
        account: false,
        selectedNetwork: false,
        isAuthenticated: false,
        protocal: false,
        Connector: false,
      });

    })

  } catch (error) {
    console.log(error)
  }

}
var popup;
export default async function connectMetaMask(current,set, setError, close, disconnect = false) {
    try {

      
      if(disconnect && window.ethereum)
        if (popup && !popup.closed) 
          popup.focus();
        else 
          popup = window.open("https://metamask.zendesk.com/hc/en-us/articles/360059535551-Disconnect-wallet-from-a-dapp","_blank",
                              "popup,width=800,height=750,screenX=500,screenY=100");
         
     



       
        

      const Ethereum = await getWeb3();

      if (Ethereum) {
        

        const addy = await Ethereum.eth.getAccounts();
        const network = await Ethereum.eth.getChainId();
     
        let auth = false;
       
        if (current.allowedNetworks.includes(network)) 
          auth = true;
     

        set({
          ...current,
          account: addy[0],
          selectedNetwork: network,
          isAuthenticated: auth,
          protocal: 'metamask',
          Connector: window.ethereum,
          
        });
       

        await listenMMAccount(Ethereum, current,set).finally(()=> setError({isOpen : false, message : ``, type : false}));

      } else throw new Error('Provider not found');
    } catch (error) {
    
      if (error.code === 4001) {close(false) ; setError({isOpen : true, message : `${error.message}`, type : 'error'});}
      else if (error.code === -32002) {close(false) ; setError({isOpen : true, message : `${error.message}`, type : 'error'});}
      else if (error.code === 4003) {close(false) ; setError({isOpen : true, message : `${error.message}`, type : 'error'});}
      else {close(false) ; setError({isOpen : false, message : ``, type : false});}
    }
}
