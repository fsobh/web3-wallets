import React from 'react'
import styles from '../styles.module.css'
import {
  connectFormatic,
  connectMetaMask,
  connectPortis,
  connectWalletConnect,
  connectCoinBaseWallet
} from '../Connectors';
import { UserContext } from '../State/Provider'
export const ExampleComponent = ({ text }) => {
  const [connectedWallet, setWallet] = React.useContext(UserContext);

  // React.useState(()=> setWallet({account: "qww",
  // selectedNetwork: null,
  // isAuthenticated: false,
  // protocal: false,
  // Connector: false,}),[])

  //return <div onClick={async ()=>  connectCoinBaseWallet(connectedWallet, setWallet)} className={styles.test}>Example Component: {connectedWallet.account}<br/>Example Component: {connectedWallet.selectedNetwork}</div>
  return (
    <div  className= "p-3 d-lg-flex d-md-flex justify-content-center">
    
    
         
    
    
        <div class="btn-group" role="group" aria-label="Basic example" style={{maxHeight: "fit-content", zIndex : 1}}>
      {/* {props.network ? props.network == (process.env.REACT_APP_STAGE === "BETA" ?  "4" : "1") ? 
       
       process.env.REACT_APP_STAGE == "BETA" ? <button type="button" className="btn btn-warning p-1" style={{fontSize:"0.8em"}}>  
            <span >Rinkeby </span>
       </button>:
          <button type="button" className="btn btn-success p-1" style={{fontSize:"0.8em"}}>  
          <span >Mainnet </span>
      </button>
       : 
       <button type="button" className="btn btn-danger p-1" style={{fontSize:"0.8em"}}>  
            <span >Network not supported</span>
        </button>    
       :
       <button type="button" className="btn btn-danger p-1" style={{fontSize:"0.8em"}}>  
            <span >Not connected</span>
       </button>
     } */}
  <button type="button" class="btn  p-1 connectButton" style={{fontSize:"0.8em"}} onClick={()=> props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ? null : setOpen(!isOpen)}><span className="font-weight-bold  " >{  props.account && (typeof props.account === 'string' || props.account instanceof String) ? `${props.account.substring(0,6)}...${props.account.substring(props.account.length - 6, props.account.length )}    `  : `Connect to Wallet    ` }</span></button>
      
      {
      
      props.Protocal ? 
      
      props.Protocal == "metamask" ? 
      
      <img className="bg-white p-1" src={MetamaskTop} height="35px" width="35px" style={
        /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
      
      
       : props.Protocal == "walletconnect" ? 
       
       <img className="bg-white p-1" src={WalletConnectTop} height="35px" width="35px" style={
         /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
       
       : 
    
        props.Protocal == "trezor" ? 
       
        <img className="bg-white p-1" src={TrezorLogo} height="35px" width="35px" style={
         /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */ {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
       :
    
       props.Protocal == "portis" ? 
       
        <img className="bg-white p-1" src={Portis} height="35px" width="35px" style={
          /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
       :
        props.Protocal == "coinbase" ? 
       
        <img className="bg-white " src={Coinbase} height="35px" width="35px" style={
          /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
       :
       props.Protocal == "formatic" ? 
       
        <img className="bg-white " src={Formatic} height="35px" width="35px" style={
          /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
       :
        <img className="bg-dark p-1" src={ConnectWalletIconswallet} height="35px" width="35px" style={
          /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
    
       : <img className="bg-dark p-1" src={ConnectWalletIconswallet} height="35px" width="35px" style={
         /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */ {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
       
       }
      
      {/** To do : Add logout button   */}
      {/* {props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?  <button type="button" className="btn btn-danger p-1" style={{fontSize:"0.6em"}}
      onClick={()=> {
    
        console.log(myRef)
    
      }}
      >  
            <span >Logout</span>
       </button> :null} */}
    
     
    </div>
    
      </div>
      );


}
