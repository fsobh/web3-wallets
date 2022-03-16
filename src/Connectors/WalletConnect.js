import QRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnect from '@walletconnect/client';


async function listenWCAccount(connector,current,set) {
    connector.on('connect', (error, payload) => {
      if (error) {
        throw error;
      }

      const { accounts, chainId } = payload.params[0];

      if (!current.allowedNetworks.includes(chainId)) {
        //must be on mainnet or Testnet
        set({
          ...current,
          selectedNetwork: chainId,
          isAuthenticated: false,
          protocal: "walletconnect",
          Connector: connector,
        });
      } else {
 
        if (accounts && accounts[0]) 
            set({
              ...current,
              account: accounts[0],
              selectedNetwork: chainId,
              isAuthenticated: true,
              protocal: "walletconnect",
              Connector: connector,
            });
        
        else {
          /*
					@Arg1 : account address (String)
					@Arg2 : isAuthenticated (bool) 
					*/
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
    });

    connector.on('session_update', (error, payload) => {
      if (error) {
        throw error;
      }

      const { accounts, chainId } = payload.params[0];

      if (!current.allowedNetworks.includes(chainId)) {
        //must be on mainnet or Testnet
        console.log("CID : ", chainId)
        set({
          ...current,
         
          selectedNetwork: chainId,
          isAuthenticated: false,
          protocal: "walletconnect",
          Connector: connector,
        });
   
      } else {
        set({
          ...current,
         
          selectedNetwork: chainId,
          isAuthenticated: true,
          protocal: "walletconnect",
          Connector: connector,
        });
        if (accounts && accounts[0]) 
            set({
              ...current,
              account : accounts[0],
              selectedNetwork: chainId,
              isAuthenticated: true,
              protocal: "walletconnect",
              Connector: connector,
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
      }
    });

    connector.on('disconnect', (error, payload) => {
     
      set({
        ...current,
        account: false,
        selectedNetwork: false,
        isAuthenticated: false,
        protocal: false,
        Connector: false,
      });
    
      if (error) {
        throw error;
      }
      console.log("ass")
    
    });

    window.addEventListener("beforeunload", (ev) => {
      if (connector.connected){
        set({
          ...current,
          account: false,
          selectedNetwork: false,
          isAuthenticated: false,
          protocal: false,
          Connector: false,
        });
        return  connector.killSession()
      }
   });
}

async function connectWalletConnect(current,set) {
    try {



      const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal
      });

      // if (connector.connected && disconnect && current.isAuthenticated){ //on disconnect button click
      //    await connector.killSession()

      //    set({
      //     ...current,
      //     account: false,
      //     selectedNetwork: false,
      //     isAuthenticated: false,
      //     protocal: false,
      //     Connector: false,
      //   });
        
      //   return

      //   }

      //JUST INCASE, proper handling is at end of listenWCAccount() function
      if (connector.connected)
        await connector.killSession()

      // TODO: check if connector is connected, if connected then disconnect it
      await connector.connect();

      if (connector.connected) {
        
     

          
        await listenWCAccount(connector,current,set);

        if (!current.allowedNetworks.includes(connector.chainId)) {
          //must be on mainnet or Testnet

          

          set({
            ...current,
            account: connector.accounts[0] || false,
            selectedNetwork: connector.chainId,
            isAuthenticated: false,
            protocal: "walletconnect",
            Connector: connector,
          });

          

          if (connector.accounts && connector.accounts[0]) 
              set({
                ...current,
                account: connector.accounts[0],
                selectedNetwork: connector.chainId,
                isAuthenticated: false,
                protocal: "walletconnect",
                Connector: connector,
              });
          
            
        } else {
          //Do this check to detect if the user disconnected their wallet from the Dapp
          if (connector.accounts && connector.accounts[0]) {
            set({
              ...current,
              account: connector.accounts[0],
              selectedNetwork: connector.chainId,
              isAuthenticated: true,
              protocal: "walletconnect",
              Connector: connector,
            });
          } else {

            
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
      }
    } catch (error) {
      console.log(error);

   
    }
}

export default connectWalletConnect;