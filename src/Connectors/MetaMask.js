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

async function listenMMAccount(Ethereum, set) {

    window.ethereum.on('accountsChanged', async function (accounts) {
      console.log(accounts);

      const network = await Ethereum.eth.getChainId();

      if (network !== getAllowedNetwork()) {
        //must be on mainnet or Testnet
        props.onNetworkChange(network, false, "metamask",window.ethereum);
      } else {
        //Do this check to ddetect if the user disconnected their wallet from the Dapp
        if (accounts && accounts[0]) props.onAcountChange(accounts[0], true, "metamask",window.ethereum);
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

    window.ethereum.on('chainChanged', async function (chainId) {
      const chainIDDecimal = parseInt(chainId, 16);

      if (chainIDDecimal !== getAllowedNetwork()) {
        //must be on mainnet or Testnet (Web3 returns it as a decimal, thats why im converting ) - window.ethereum returns it as a hex
        props.onNetworkChange(chainIDDecimal, false, "metamask",window.ethereum);
      } else {
        props.onNetworkChange(chainIDDecimal, true, "metamask",window.ethereum);
      }
    });
}

export default async function connectMetaMask(current,set) {
    try {



      const Ethereum = await getWeb3();

      if (Ethereum) {
        //this is all the user data we need, and need to track
        const addy = await Ethereum.eth.getAccounts();
        const network = await Ethereum.eth.getChainId();
        let auth = true;

        //TODO : FIX
        if (network !== getAllowedNetwork()) auth = false;
        //add check here for chain

        set({
          
          account: addy[0],
          selectedNetwork: network,
          isAuthenticated: auth,
          protocal: 'metamask',
          Connector: window.ethereum,
          allowedNetworks : current.allowedNetworks
        })
       

        await listenMMAccount(Ethereum);
      } else throw new Error('Provider not found');
    } catch (error) {
      console.log(error.code);

      if (error.code === 4001) setRejected(true);

      if (error.code === -32002) setPending(true);

      if (error.code === 4003) setWeb3NotDetected(true);
    }
}
