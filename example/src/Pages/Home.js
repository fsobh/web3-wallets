import React from 'react'
import  {WalletButton,WalletContext}  from 'web3-wallets-react'
import 'web3-wallets-react/dist/index.css'
import Nav from '../Components/Nav'
const Home = () => {
  const { commitTransaction} = React.useContext(WalletContext)

  return( 
  <div style={{backgroundColor : "darkgrey", height: "100vh"}}>
    <Nav/>
      <br/>
      <WalletButton/>
      <br/>
      <button onClick={async ()=> await commitTransaction("0x2cbA00e6e4F6A5e6A0a2DBeDdBd56312994D36C9","0.05")}> 
        transact 
      </button>
  </div>
   );
}
export default Home;