import React, { Fragment, useState } from 'react'
import styles from './styles/buttons.css'
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
import { Modal } from "./Modal";

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

  const handleClick = async (i) => {

    switch (i){
      case 0 : 
        await connectMetaMask(connectedWallet, setWallet);
        break;
      case 1 : 
        await connectWalletConnect(connectedWallet, setWallet);
        break;
      case 2 : 
        await connectCoinBaseWallet(connectedWallet, setWallet);
        break;
      case 3 : 
        await connectFormatic(connectedWallet, setWallet);
        break;
      case 4 : 
        await connectPortis(connectedWallet, setWallet);
        break;

      }

  }

  const handleZabreClick = async (i) => connectedWallet.account && connectedWallet.isAuthenticated &&
    (typeof connectedWallet.account === 'string' || connectedWallet.account instanceof String) ? null :
    await handleClick(i)

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false)
  };

  return (
    <Fragment>

   
    
    {/* Modal Code Here */}
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Modal.ModalContent>

      {connectedWallet.account && connectedWallet.isAuthenticated &&
    (typeof connectedWallet.account === 'string' || connectedWallet.account instanceof String) ?
      null : 
      whoWeData &&
              whoWeData.map((item, i) => (
                <>
                <div
                  key={i}
                  className={styles.pricingItem}
                  onClick={async () => await handleZabreClick(i)}>
                    
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
        onClick={handleOpenModal}>
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
