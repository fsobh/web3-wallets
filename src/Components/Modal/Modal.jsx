import React, { useRef } from 'react'
import ReactDOM from "react-dom";
import useOnClickOutside from '../../Hooks/useOnClickOutside';
import styles from "./Modal.module.css";
import { ConnectWalletIconswallet } from '../../assets';
export const Modal = ({ children, ...props }) => {
    return ReactDOM.createPortal(React.cloneElement(children, props), document.querySelector("body"));
}

const ModalContent = ({ children, open = false, onClose }) => {
    const ref = useRef();

    useOnClickOutside(ref, onClose);

    return (
        <div className={styles.modal}
            role="dialog"
            aria-labelledby="modal_label"
            aria-describedby="modal_description"
            aria-modal="true"
            style={{ display: open ? "inherit" : "none" }}
        >
            
            <div className={styles.modal__content} ref={ref}>



            <div className={styles.daddy}>
                Connect wallet 
                <img className={styles.logo}  src={ConnectWalletIconswallet}/>
                <span onClick={onClose} className={styles.close}>&times;</span>  
                <hr className={styles.bord}/>
            </div>  

                {children}
            </div>
        </div>
    )
}

Modal.ModalContent = ModalContent;

export default Modal;