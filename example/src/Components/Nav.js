import React from 'react'
import { Link } from "react-router-dom";




const ModalContent = () => {

   return <nav
    style={{
      borderBottom: "solid 1px",
      paddingBottom: "1rem",
    }}
  >
    <Link to="/">{"  "}Home{"  "} </Link> |
    <Link to="/net">Network {"  "}</Link> |
    <Link to="/acc">{"  "}Account{"  "}</Link> |
  </nav>

}



export default ModalContent;