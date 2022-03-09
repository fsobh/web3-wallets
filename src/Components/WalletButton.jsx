import React from 'react'
import styles from '../styles.module.css'
import {
  connectFormatic,
  connectMetaMask,
  connectPortis,
  connectWalletConnect
} from '../Connectors'
import {UserContext} from '../State/Provider'
export const ExampleComponent = ({ text }) => {

    // const [connectedWallet, setWallet] = React.useContext(UserContext);

    // React.useState(()=> setWallet({account: "qww",
    // selectedNetwork: null,
    // isAuthenticated: false,
    // protocal: false,
    // Connector: false,}),[])

  return <div className={styles.test}  >Example Component: {text}</div>
}
