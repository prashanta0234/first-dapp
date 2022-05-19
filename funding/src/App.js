// import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import {Button, Card} from 'react-bootstrap'
import detectEthereumProvider from '@metamask/detect-provider'
import loadContract from './utils/loadContract';

import { useEffect, useState } from 'react';
function App() {
  const [web3api,setWeb3api] =useState({
    
      provider: null,
      web3: null,
      contract: null
    
  })
  const[account,setAccount]=useState("");
  const [balance,setBalance]=useState('')
  const[isLoding,setIsloding]=useState(false);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]))}
  const loding=()=>{
    setIsloding(true);
  }
  useEffect(()=>{

    const loadProvider= async()=>{
      const provider = await detectEthereumProvider();
      const contract=await loadContract("Funder",provider);
     if(provider){
       setAccountListener(provider)
       provider.request({method:"eth_requestAccounts"})
       setWeb3api({
         provider,
         web3: new Web3(provider),
         contract,
       })
     }
     else{
       console.error("please install metaMask");
     }          
    }
    loadProvider()
    
  },[])
//  const connectTometa = async()=>{
//    const accounts=await window.ethereum.request({
//      method:'eth_requestAccounts',
//    })
//   //  setAccount(accounts);
  
//  }
 useEffect(()=>{
   const getAccount=async()=>{
     const accounts=await web3api.web3.eth.getAccounts();
     setAccount(accounts[0]);
     console.log(accounts[0])

   }
   web3api.web3 && getAccount()

 },[web3api.web3]);

 useEffect(()=>{
const loadBalance=async()=>{
  const {web3,contract}=web3api;
  const balance=await web3.eth.getBalance(contract.address);
  setBalance(web3.utils.fromWei(balance,"ether"));
}
web3api.contract && loadBalance();
 },[web3api,isLoding])

// transfer ether

  const sendEther=async()=>{
    const{contract,web3} =web3api;
    await contract.transfer({
      from:account,
      value:web3.utils.toWei("2","ether")
    })
    loding();
  };
// make withdraw
const makeWithdraw=async()=>{
  const {contract,web3}=web3api;
  const amount= await web3.utils.toWei("2","ether");
  await contract.withdraw(amount, {
    from: account,

  })
  loding();
}
  return (
    <div className="App">
    <Card style={{ width: 'auto',margin:'5px'}} className="Card">

    <Card.Body>
    <Card.Title>Funding</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Balance :{balance} ETH</Card.Subtitle>

    <Card.Text>
      Account : {account?account :"notConnected"}
    </Card.Text>
    {/* <Button variant="primary" onClick={}>Connect To metamask</Button> &nbsp; &nbsp; */}
    <Button variant="primary" onClick={sendEther}> Transfer</Button> &nbsp; &nbsp;
    <Button variant="success" onClick={makeWithdraw}> Withdraw</Button>

  </Card.Body>
</Card>
    </div>
  );
}

export default App;
