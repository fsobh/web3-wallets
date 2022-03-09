import QRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnect from '@walletconnect/client';


async function listenWCAccount(connector) {
    connector.on('connect', (error, payload) => {
      if (error) {
        throw error;
      }

      const { accounts, chainId } = payload.params[0];

      if (chainId !== getAllowedNetwork()) {
        //must be on mainnet or Testnet
        props.onNetworkChange(chainId, false,"walletconnect",connector);
      } else {
        
      
        
      
        if (accounts && accounts[0]) props.onAcountChange(accounts[0], true,"walletconnect",connector);
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

    connector.on('session_update', (error, payload) => {
      if (error) {
        throw error;
      }

      const { accounts, chainId } = payload.params[0];

      if (chainId !== getAllowedNetwork()) {
        //must be on mainnet or Testnet
        console.log("CID : ", chainId)
        props.onNetworkChange(chainId, false,"walletconnect",connector);
      } else {
        props.onNetworkChange(chainId, true, "walletconnect",connector);
        if (accounts && accounts[0]) props.onAcountChange(accounts[0], true,"walletconnect",connector);
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

    connector.on('disconnect', (error, payload) => {
      if (error) {
        throw error;
      }

      props.onAcountChange(false, false,false,false);
      props.onNetworkChange(false, false,false,false);
    });

    window.addEventListener("beforeunload", (ev) => {
      if (connector.connected)
        return  connector.killSession()
      
   });
}

async function connectWalletConnect(disconnect = false) {
    try {



      const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal
      });

      if (connector.connected && disconnect && props.authenticated){ //on disconnect button click
         await connector.killSession()
         props.onAcountChange(false, false,false,false);
         props.onNetworkChange(false, false,false,false);

         return toast.info('Wallet Connect Session Terminated', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

        }

      //JUST INCASE, proper handling is at end of listenWCAccount() function
      if (connector.connected)
        await connector.killSession()

      // TODO: check if connector is connected, if connected then disconnect it
      await connector.connect();

      if (connector.connected) {


        await listenWCAccount(connector);

        if (connector.chainId !== getAllowedNetwork()) {
          //must be on mainnet or Testnet
          props.onNetworkChange(connector.chainId, false,"walletconnect",connector);

          if (connector.accounts && connector.accounts[0]) 
            props.onAcountChange(connector.accounts[0], false,"walletconnect",connector);
            
        } else {
          //Do this check to detect if the user disconnected their wallet from the Dapp
          if (connector.accounts && connector.accounts[0]) {
            props.onAcountChange(connector.accounts[0], true,"walletconnect",connector);
            props.onNetworkChange(connector.chainId, true,"walletconnect",connector);
          } else {
            /*
			  @Arg1 : account address (String)
			  @Arg2 : isAuthenticated (bool) 
			*/
            props.onAcountChange(false, false,false,false);
            props.onNetworkChange(false, false,false,false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
}

export default connectWalletConnect;