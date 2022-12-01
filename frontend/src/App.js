import './css/App.css';
import { useState, useEffect } from 'react';
import SideBar from "./components/SideBar";
import MainContent from './components/MainContent';
import Notification from './components/Notification';

function App() {

  const [currentAccount, setCurrentAccount] = useState(''); //change variables
  const [correctNetwork, setCorrectNetwork] = useState(false);

  // Call Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async() => {
    try{
      const {ethereum} = window

      if(!ethereum) {
        console.log('Metamask is not detected.')
        return;
      }
      let chainId = await ethereum.request({method: 'eth_chainId'})
      console.log('Connected to chain:' + chainId);

      const goerliChainID = '0x5'; // https://docs.metamask.io/guide/ethereum-provider.html#chain-ids

      if(chainId !== goerliChainID) {
        alert('You are not connected to the goerli test net.');
        setCorrectNetwork(false);
        return;
      }else{
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({method: 'eth_requestAccounts'})

      console.log("Account connected: ", accounts[0])
      setCurrentAccount(accounts[0]);

    }catch(error){
      console.log("Error connecting to metamask ", error);
    }
  }


  // useEffect(() => {
  //   connectWallet();
  // });


/**
 * if not connected to the metamask, the button will appear.
 */
  return (
    <> {currentAccount === ''?
    <button className="btnMeta" onClick={connectWallet}>Connect to metamask</button>
    : <div className="home"><SideBar />
    <MainContent />
    <Notification /></div>}</>
  );
}

export default App;
