import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

const navigate = useNavigate();

  const handleConnectMetaMask = async () => {
    if(window.ethereum) {
      console.log('Ethereum support is available')
      if (window.ethereum.isMetaMask) {
        console.log('MetaMask is active')
        localStorage.setItem('connected', 'true')
        navigate('/home')
      } else {
        console.error('MetaMask is not available')
      }
    } else {
      console.error('Pls install MetaMask')
    }   
}

  return (
    <Container>
        <Box sx={{width:1, backgroundColor:'grey.200', mt:10, pb:5}}>
            <Box sx={{display:'flex', justifyContent:'center', mb:3}}>
              <Typography variant='h2'>Welcome to Voting!</Typography>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center', mb:3}}>
                <Button sx={{textTransform:'none'}} variant="contained" onClick={handleConnectMetaMask}>Connect MetaMask</Button>
            </Box>
        </Box>
    </Container>
  )
}

