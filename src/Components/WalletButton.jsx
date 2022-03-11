import React from 'react'
import styles from './styles/buttons.css'
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
export const ExampleComponent = ({ text }) => {
  const [connectedWallet, setWallet] = React.useContext(UserContext);

  // React.useState(()=> setWallet({account: "qww",
  // selectedNetwork: null,
  // isAuthenticated: false,
  // protocal: false,
  // Connector: false,}),[])

  //return <div onClick={async ()=>  connectCoinBaseWallet(connectedWallet, setWallet)} className={styles.test}>Example Component: {connectedWallet.account}<br/>Example Component: {connectedWallet.selectedNetwork}</div>
  // return (
    
    
    
         
    
    
  //       <div className={styles.btngroup } >
  //     {/* {props.network ? props.network == (process.env.REACT_APP_STAGE === "BETA" ?  "4" : "1") ? 
       
  //      process.env.REACT_APP_STAGE == "BETA" ? <button type="button" className="btn btn-warning p-1" style={{fontSize:"0.8em"}}>  
  //           <span >Rinkeby </span>
  //      </button>:
  //         <button type="button" className="btn btn-success p-1" style={{fontSize:"0.8em"}}>  
  //         <span >Mainnet </span>
  //     </button>
  //      : 
  //      <button type="button" className="btn btn-danger p-1" style={{fontSize:"0.8em"}}>  
  //           <span >Network not supported</span>
  //       </button>    
  //      :
  //      <button type="button" className="btn btn-danger p-1" style={{fontSize:"0.8em"}}>  
  //           <span >Not connected</span>
  //      </button>
  //    } */}
  // <button className={styles.btn } ><span className="font-weight-bold  " > Connect to Wallet    </span></button>
      

      
  //     {/** To do : Add logout button   */}
  //     {/* {props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?  <button type="button" className="btn btn-danger p-1" style={{fontSize:"0.6em"}}
  //     onClick={()=> {
    
  //       console.log(myRef)
    
  //     }}
  //     >  
  //           <span >Logout</span>
  //      </button> :null} */}
    
     
  //   </div>
    
 
  //     );
  return (
      <div   className={styles.gridcontainer}>
        <div className={styles.griditemstart}>{connectedWallet.selectedNetwork || 1}</div>
        <div className={styles.griditemcenter}>{connectedWallet.account || 2 }</div>
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
    
       : <img className={styles.straight} src={Formatic} />  
       }
       </div>  
 
      </div>
  );
}
