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
      console.log(accounts);

      const network = await Ethereum.eth.getChainId();
      const networkName = await Ethereum.eth.net.getNetworkType()

      if (!current.allowedNetworks.includes(network)) {
        //must be on mainnet or Testnet
        
        set({
          account: accounts[0],
          selectedNetwork: network,
          networkName : networkName,
          isAuthenticated: false,
          protocal: 'metamask',
          Connector: window.ethereum,
        });
       
      } else {
        
        if (accounts && accounts[0]) 
          set({
              ...current,
              account: accounts[0],
              selectedNetwork: network,
              networkName : networkName,
              isAuthenticated: true,
              protocal: 'metamask',
              Connector: window.ethereum,
          });
        else {
            set({
              ...current,
              account: false,
              selectedNetwork: false,
              networkName : false,
              isAuthenticated: false,
              protocal: false,
              Connector: false,
            });
        }
      }
    });

    window.ethereum.on('chainChanged', async function (chainId) {
      
      const chainIDDecimal = parseInt(chainId, 16); 
      const addy = await Ethereum.eth.getAccounts();
      const networkName = await Ethereum.eth.net.getNetworkType()

      if (!current.allowedNetworks.includes(chainIDDecimal)) {
        
          set({
            ...current,
            account: addy[0],
            selectedNetwork: chainIDDecimal,
            networkName : networkName,
            isAuthenticated: false,
            protocal: 'metamask',
            Connector: window.ethereum, 
          });
 
      } else {
          
        set({
            ...current,
            account: addy[0],
            selectedNetwork: chainIDDecimal,
            networkName : networkName,
            isAuthenticated: true,
            protocal: 'metamask',
            Connector: window.ethereum,
          });

      }
    });

  } catch (error) {
    console.log(error)
  }
}

export default async function connectMetaMask(current,set) {
    try {



      const Ethereum = await getWeb3();



      if (Ethereum) {
        //this is all the user data we need, and need to track
        const addy = await Ethereum.eth.getAccounts();
        const network = await Ethereum.eth.getChainId();
        const networkName = await Ethereum.eth.net.getNetworkType()
        let auth = true;

        //TODO : FIX
        if (!current.allowedNetworks.includes(network)) auth = false;
        //add check here for chain

        set({
          ...current,
          account: addy[0],
          selectedNetwork: network,
          networkName : networkName,
          isAuthenticated: auth,
          protocal: 'metamask',
          Connector: window.ethereum,
          
        })
       

        await listenMMAccount(Ethereum, current,set);

      } else throw new Error('Provider not found');
    } catch (error) {
      console.log(error);

      if (error.code === 4001) setRejected(true);

      if (error.code === -32002) setPending(true);

      if (error.code === 4003) setWeb3NotDetected(true);
    }
}
