import { useEffect, useState } from 'react'
import abi from './contractJson/VotingPlatform.json'
import {ethers} from 'ethers'
import Topics from "./components/Topics.jsx"
import Voters from './components/Voters.jsx'
import Container from 'react-bootstrap/Container';
import {Navbar, Nav} from 'react-bootstrap';
import { Link, Route, Routes} from "react-router-dom";


import './App.css'

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [account, setAccount] = useState('Not Connected');
  useEffect(()=>{
    const template = async () => {
      const contractAddress = "0xFa2992c6852dB1531984F2913E35C0615B7d7a09";
      const contractABI = abi.abi;
      try{
        // Wallet Connection
        const { ethereum } = window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
         }) 
        setAccount(account);
        // To Read Blockchain
        const provider = new ethers.providers.Web3Provider(ethereum);
        // To Write on Blockchain
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        // console.log(contract)
        setState({provider,signer,contract});
      }catch(error){
        console.log(error);
      }
    }
    template();
  }, [])

  return (
    <>
        <div className="App">
          <Navbar bg='dark' variant='dark' fixed="top">
              <Container>
                <Navbar.Brand href="/" className='site-title'>VoterZ</Navbar.Brand>
                <Nav className="me-auto txt">
                <Nav.Link as={Link} to="/" className="leftMargin">Topics</Nav.Link>
                    <Nav.Link as={Link} to="/voter" className='nav-item'>Voter</Nav.Link>
                  <Navbar.Text className='nav-item'>
                    Connected Account: <a href={`https://etherscan.io/address/${account}`} target="_blank">{ account }</a>
                  </Navbar.Text>
                </Nav>
              </Container>
          </Navbar>
          
          <Routes>
            <Route path='/' element={<Topics state={state}/>}/>
            <Route path='/voter' element={<Voters state={state}/>}/>
          </Routes>
        </div>
    </>
  )
}

export default App;