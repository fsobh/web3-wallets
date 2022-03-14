import React from 'react'
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
  TrezorLogo,
  Coinbase,
  Formatic,
  Portis
} from '../assets/index'
export const WalletButton = () => {

  const [connectedWallet, setWallet] = React.useContext(UserContext);

  return (
      <div   className={styles.gridcontainer}>
        
        {connectedWallet.selectedNetwork && connectedWallet.isAuthenticated ? 
             <div className={styles.griditemstart}>{fetchNetworkNameByID(connectedWallet.selectedNetwork).name || 'Private Network'}</div>

        : connectedWallet.selectedNetwork && !connectedWallet.isAuthenticated ? 
        <div className={styles.griditemstart}>Network not supported</div>

   : null 
   }


            <div className={styles.griditemstartnon} 
            onClick = {async ()=>
              connectedWallet.account && connectedWallet.isAuthenticated &&
               (typeof connectedWallet.account === 'string' || connectedWallet.account instanceof String) ? null : await connectMetaMask(connectedWallet,setWallet)
              }>
              {connectedWallet.account && (typeof connectedWallet.account === 'string' || 
              connectedWallet.account instanceof String) ?
              `${connectedWallet.account.substring(0,6)}...${connectedWallet.account.substring(connectedWallet.account.length - 6, connectedWallet.account.length )}  ` 
             :`Connect to Wallet  `
            }</div>
         <div className={styles.gridimg}>
        {
      
          connectedWallet.protocal ? 
          
          connectedWallet.protocal == "metamask" ? 
          
          <img className="bg-white p-1 " src={MetamaskTop} height="35px" width="35px" style={
            /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
          
          
          : connectedWallet.protocal == "walletconnect" ? 
          
          <img className="bg-white p-1" src={WalletConnectTop} height="35px" width="35px" style={
            /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
          
          : 
        
            connectedWallet.protocal == "trezor" ? 
          
            <img className="bg-white p-1" src={TrezorLogo} height="35px" width="35px" style={
            /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */ {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
          :
        
          connectedWallet.protocal == "portis" ? 
          
            <img className="bg-white p-1" src={Portis} height="35px" width="35px" style={
              /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
          :
            connectedWallet.protocal == "coinbase" ? 
          
            <img className="bg-white " src={Coinbase} height="35px" width="35px" style={
              /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
          :
          connectedWallet.protocal == "formatic" ? 
          
            <img className="bg-white " src={Formatic} height="35px" width="35px" style={
              /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
          :
            <img className="bg-dark p-1" src={ConnectWalletIconswallet} height="35px" width="35px" style={
              /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
        
          : <img className={styles.straight} src={ConnectWalletIconswallet} />  
          }
       </div>  
 
      </div>
  );
}
