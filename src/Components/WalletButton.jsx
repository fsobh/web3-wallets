import React, { Fragment, useState, useEffect } from 'react'
import styles from './styles/buttons.module.css'
import { fetchNetworkNameByID } from '../Utils/NetworkUtil';
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
  ConnectWalletIconsw1,
	ConnectWalletIconsw2,
  TrezorLogo,
  Coinbase,
  Formatic,
  Portis
} from '../assets/index'
import { Modal, GeneralModal } from "./Modal";


export const WalletButton = () => {

  const whoWeData = [
    {img:ConnectWalletIconsw1,text:'MetaMask'},
    {img:ConnectWalletIconsw2,text:'Wallet Connect'},
    {img:Coinbase,text:'Coinbase Wallet'},
    
    {img:Formatic,text:'Formatic'},
    {img:Portis,text:'Portis'},
    // {img:ConnectWalletIconsw3,text:'Ledger'},
    // {img:TrezorLogo,text:'Trezor'},
  ]
  const [connectedWallet, setWallet] = React.useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generalModalSettings, setGMSettings] = useState(false)

  const handleWalletSelect = async (i) => {
    switch (i){
      case 0 : {
        return await connectMetaMask(connectedWallet, setWallet,setGMSettings,setIsModalOpen);
      }
      case 1 : {
      return await connectWalletConnect(connectedWallet, setWallet);
      }
      case 2 : {
      return  await connectCoinBaseWallet(connectedWallet, setWallet,setGMSettings,setIsModalOpen);
      }
      case 3 : { 
      return await connectFormatic(connectedWallet, setWallet,setGMSettings,setIsModalOpen);
      }
      case 4 :  {
      return await connectPortis(connectedWallet, setWallet,setGMSettings,setIsModalOpen);
      }
      default:
         return console.log("none")

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

            {connectedWallet.account && connectedWallet.isAuthenticated &&
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
                      
                          
                      
                      <div className={styles.pricingItempricing}><span  className={styles.thin}>Connected network : </span> {fetchNetworkNameByID(connectedWallet.selectedNetwork).name} </div>
                      
            </div>
            <div className={styles.accountInfoheader} >
                      
                          
                      {/**Cant do this for meta mask (display banner), walletconnect : killsession() - coinbase : close() - formatic & portis (thru sdk) ==> logout() */}
                      {/* <div className={styles.pricingItempricing}> <button onClick= {async ()=> {await connectedWallet.Connector.logout()}} className={styles.disconnectButton }>Disconnect</button></div>
                        */}
            </div>
            

            </div>: 
            whoWeData &&
                    whoWeData.map((item, i) => (
                      <>
                      <div
                        key={i}
                        className={styles.pricingItem}
                        onClick={async () => await onWalletSelect(i)}>
                          
                        <img src={item.img} width="40" className={styles.walicon} alt="" />
                        <div className={styles.pricingItempricing}> {item.text} </div>
                      
                      </div>
                      <hr className={styles.bord}/>
                      
                      </>
                    )) }
            </Modal.ModalContent>
            
      </Modal>

          <div className={styles.gridcontainer}>

            {
              connectedWallet.selectedNetwork && connectedWallet.isAuthenticated ?
                <div className={styles.griditemstart}>{fetchNetworkNameByID(connectedWallet.selectedNetwork).name || 'Private Network'}</div>

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
