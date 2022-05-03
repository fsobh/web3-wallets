import React from 'react'
import ReactDOM from "react-dom";
import styles from "./GeneralModal.module.css";
import { ConnectWalletIconswallet } from '../../assets';



export const GeneralModal = ({ children, ...props }) => {
    return ReactDOM.createPortal(React.cloneElement(children, props), document.querySelector("body"));
}

const  GeneralModalContent = ({ children, open , onClose, text= "Loading, Please wait..." , type = "loading"}) => {
 

    return (
        <div className={styles.modalOverlay} style={{ display: open ? "inherit" : "none" }}>
        <div className={styles.modal}
            role="dialog"
            aria-labelledby="modal_label"
            aria-describedby="modal_description"
            aria-modal="true"
            style={{ display: open ? "inherit" : "none" }}>
            
            <div className={styles.modal__content} >

                <div className={styles.daddy}>
                {type === 'error' ? <span className={styles.close}>&times;</span>  : <div className={styles.ldsdualring}/> }
                
                <br/>
                    <p>{text}</p>
                <br/>
                {type === 'error' ? <button className={styles.disconnectButton} onClick={onClose}>Dismiss</button>  : null }
                </div>  
                {children}
            </div>
        </div>
        </div>
    )
}

GeneralModal.GeneralModalContent = GeneralModalContent;

export default GeneralModal;