import React from 'react'
import { BrowserRouter,Route, Routes } from "react-router-dom";
import 'web3-wallets/dist/index.css'
import Home from './Pages/Home';
import Account from './Pages/Account';
import Network from './Pages/Network';
const App = () => {

  return ( 
  <BrowserRouter> 
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="net" element={<Network/>} />
      <Route path="acc" element={<Account/>} />
    </Routes>
  </BrowserRouter>)
}

export default App
