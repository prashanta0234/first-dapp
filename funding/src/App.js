// import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import {Button, Card} from 'react-bootstrap'
import detectEthereumProvider from '@metamask/detect-provider'

import { useEffect, useState } from 'react';
function App() {
  const [web3api,setWeb3api] =useState({
    
      provider: null,
      web3: null,
    
  })
  const[account,setAccount]=useState("");
  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]))}
  
  useEffect(()=>{

    const loadProvider= async()=>{
      const provider = await detectEthereumProvider()
     if(provider){
       setAccountListener(provider)
       provider.request({method:"eth_requestAccounts"})
       setWeb3api({
         provider: provider,
         web3: new Web3(provider),
       })
     }
     else{
       console.error("please install metaMask");
     }          
    }
    loadProvider()
    
  },[])
 const connectTometa = async()=>{
   const accounts=await window.ethereum.request({
     method:'eth_requestAccounts',
   })
  //  setAccount(accounts);
  
 }
 useEffect(()=>{
   const getAccount=async()=>{
     const accounts=await web3api.web3.eth.getAccounts();
     setAccount(accounts[0]);
     console.log(accounts[0])

   }
   web3api.web3 && getAccount()
  //  window.location.reload();
 },[web3api.web3]);



  return (
    <div className="App">
    <Card style={{ width: 'auto',margin:'5px'}} className="Card">

    <Card.Body>
    <Card.Title>Funding</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Balance :{10} ETH</Card.Subtitle>

    <Card.Text>
      Account : {account?account :"notConnected"}
    </Card.Text>
    <Button variant="primary" onClick={connectTometa}>Connect To metamask</Button> &nbsp; &nbsp;
    <Button variant="primary"> Transfer</Button> &nbsp; &nbsp;
    <Button variant="success"> Withdraw</Button>

  </Card.Body>
</Card>
    </div>
  );
}

export default App;
