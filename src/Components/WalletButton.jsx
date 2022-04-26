import React, { Fragment, useState} from 'react'
import styles from './styles/buttons.module.css'
import {
  connectFormatic,
  connectMetaMask,
  connectPortis,
  connectWalletConnect,
  connectCoinBaseWallet
} from '../Connectors';
import { UserContext } from '../State/Provider'
import {
  MetamaskTop,
  WalletConnectTop,
  ConnectWalletIconswallet,
  TrezorLogo,
  Coinbase,
  Formatic,
  Portis
} from '../assets/index'
import { Modal, GeneralModal } from "./Modal";
import  fetchNetworkNameByID  from '../Utils';

export const WalletButton = () => {

  const [connectedWallet, setWallet] = React.useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generalModalSettings, setGMSettings] = useState(false)
  const [networkName, setNetworkName] = useState('')


  const handleWalletSelect = async (i) => {

   
    try {
      
   
    switch (i){
      case 'metamask': {
        return await connectMetaMask(connectedWallet, setWallet,setGMSettings,setIsModalOpen);
      }
      case 'walletconnect' : {
      return await connectWalletConnect(connectedWallet, setWallet);
      }
      case 'coinbase' : {
      return  await connectCoinBaseWallet(connectedWallet, setWallet);
      }
      case 'formatic' : { 
      return await connectFormatic(connectedWallet, setWallet,setGMSettings,setIsModalOpen);
      }
      case 'portis' :  {
      return await connectPortis(connectedWallet, setWallet,setGMSettings,setIsModalOpen, false);
      }
      default:
         return console.log("none")

      }
    } catch (error) {
      
    }
  }
  const handleWalletDisconnect = async (i) => {
    try {
      
   
    switch (i){
      case 'metamask' : {
        return  await connectMetaMask(connectedWallet, setWallet,setGMSettings,setIsModalOpen,true)
      }
      case 'walletconnect' : {
      return await connectWalletConnect(connectedWallet, setWallet,true);
      }
      case 'coinbase' : {
      return  await connectCoinBaseWallet(connectedWallet, setWallet,setGMSettings,setIsModalOpen,true);
      }
      case 'formatic' : { 
      return await connectFormatic(connectedWallet, setWallet,setGMSettings,setIsModalOpen, true);
      }
      case 'portis' :  {
      return await connectPortis(connectedWallet, setWallet,setGMSettings,setIsModalOpen,true);
      }
      default:
         return console.log("none")

      }
    } catch (error) {
      
    }
  }
  const onWalletSelect = async (i) =>
     connectedWallet.account && connectedWallet.isAuthenticated &&
    (typeof connectedWallet.account === 'string' || connectedWallet.account instanceof String) ? null : await handleWalletSelect(i)
  const handleOpenWalletModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseWalletModal = () => {
    setIsModalOpen(false)
  };
  const handleCloseGeneralModal = () => {
    setGMSettings({...generalModalSettings, isOpen : false})
  };

  React.useEffect(()=> {

    
 
    if(connectedWallet.selectedNetwork){

        const fetchNetName = async () => {

          const ll = await fetchNetworkNameByID(connectedWallet.selectedNetwork);

          if (ll)
          {
            
            setNetworkName(ll);
          
          }
       
        }


    fetchNetName();

  }


  },[connectedWallet.selectedNetwork]);
 
  return (
    <Fragment>

      {/* ERROR and Loading Modal Code Here */}
      <GeneralModal open={generalModalSettings.isOpen} type = {generalModalSettings.type} text = {generalModalSettings.message} onClose = {handleCloseGeneralModal}>
        <GeneralModal.GeneralModalContent>  
        </GeneralModal.GeneralModalContent>
      </GeneralModal>

      {/* Wallet Modal Code Here */}
      <Modal open={isModalOpen} onClose={handleCloseWalletModal} account = {connectedWallet.account}>
            <Modal.ModalContent>

            {connectedWallet.account && 
          (typeof connectedWallet.account === 'string' || connectedWallet.account instanceof String) ?
            <div   className={styles.accountInfoContainer}>

              <div className={styles.accountInfoheader} >
                                 
{connectedWallet.protocal ?

        connectedWallet.protocal == "metamask" ?

          <img className={styles.walicon} src={MetamaskTop} height="35px" width="35px"/>

          : connectedWallet.protocal == "walletconnect" ?

            <img className={styles.walicon} src={WalletConnectTop} height="35px" width="35px"/>
            :

            connectedWallet.protocal == "trezor" ?

              <img className={styles.walicon} src={TrezorLogo} height="35px" width="35px" />
                :

              connectedWallet.protocal == "portis" ?

                <img className={styles.walicon} src={Portis} height="35px" width="35px" />
                      :
                connectedWallet.protocal == "coinbase" ?

                  <img className={styles.walicon} src={Coinbase} height="35px" width="35px" />
                      :
                  connectedWallet.protocal == "formatic" ?

                    <img className={styles.walicon} src={Formatic} height="35px" width="35px" />
                    :
                    <img className={styles.walicon} src={ConnectWalletIconswallet} height="35px" width="35px" />
                    : <img className={styles.straight} src={ConnectWalletIconswallet} />
      }
                        <div className={styles.pricingItempricing}> {connectedWallet.account} </div>
              </div>

              <div className={styles.accountInfoheader} >
                      
                          
                      
                      <div className={styles.pricingItempricing}>
                        <span  className={styles.thin}>
                          Connected network : 

                          </span> {networkName} </div>
                      
            </div>
            <div className={styles.accountInfoheader} >
                      
                          
                      {/**Cant do this for meta mask (display banner),
                       *  walletconnect : killsession()
                       * coinbase : close() 
                       *  formatic & portis (thru sdk) ==> logout() */}
                      <div className={styles.pricingItempricing}>
                         <button onClick= {async ()=> {await handleWalletDisconnect(connectedWallet.protocal)}} 
                         className={styles.disconnectButton }>
                           Disconnect
                           </button>
                        </div>
                       
            </div>
            

            </div>: 
            connectedWallet.wallets && connectedWallet.wallets.map((item, i) =>  (
                      connectedWallet   ? <>
                      <div
                        key={i}
                        className={styles.pricingItem}
                        onClick={async () => await onWalletSelect(item.id)}>
                          
                        <img src={item.img} width="40" className={styles.walicon} alt="" />
                        <div className={styles.pricingItempricing}> {item.text} </div>
                      
                      </div>
                      <hr className={styles.bord}/>
                      
                      </> : null
                    )) }
            </Modal.ModalContent>
            
      </Modal>

          <div className={styles.gridcontainer}>

            {
              connectedWallet.selectedNetwork && connectedWallet.isAuthenticated ?
                <div className={styles.griditemstart}>{ networkName }</div>

                : connectedWallet.selectedNetwork && !connectedWallet.isAuthenticated ?
                  <div className={styles.griditemstart}>Network not supported</div>

                  : null
            }


            <div className={styles.griditemstartnon}
              onClick={handleOpenWalletModal}>
              {connectedWallet.account && (typeof connectedWallet.account === 'string' ||
                connectedWallet.account instanceof String) ?
                `${connectedWallet.account.substring(0, 6)}...${connectedWallet.account.substring(connectedWallet.account.length - 6, connectedWallet.account.length)}  `
                : `Connect to Wallet  `
              }</div>
            <div className={styles.gridimg}>
              {

                connectedWallet.protocal ?

                  connectedWallet.protocal == "metamask" ?

                    <img className="bg-white p-1 " src={MetamaskTop} height="35px" width="35px"/>

                    : connectedWallet.protocal == "walletconnect" ?

                      <img className="bg-white p-1" src={WalletConnectTop} height="35px" width="35px"/>
                      :

                      connectedWallet.protocal == "trezor" ?

                        <img className="bg-white p-1" src={TrezorLogo} height="35px" width="35px" />
                          :

                        connectedWallet.protocal == "portis" ?

                          <img className="bg-white p-1" src={Portis} height="35px" width="35px" />
                                :
                          connectedWallet.protocal == "coinbase" ?

                            <img className="bg-white " src={Coinbase} height="35px" width="35px" />
                                :
                            connectedWallet.protocal == "formatic" ?

                              <img className="bg-white " src={Formatic} height="35px" width="35px" />
                              :
                              <img className="bg-dark p-1" src={ConnectWalletIconswallet} height="35px" width="35px" />
                  : <img className={styles.straight} src={ConnectWalletIconswallet} />
              }
            </div>

          </div>

    </Fragment>
  );
}
