import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'

export default function Login() {
  return (
    <Container>
        <Box sx={{width:1, backgroundColor:'grey.200', mt:10, pb:5}}>
            <Box sx={{display:'flex', justifyContent:'center', mb:3}}><Typography variant='h2'>Welcome to Voting!</Typography></Box>
            <Box sx={{display:'flex', justifyContent:'center', mb:3}}>
                <Button sx={{textTransform:'none'}} variant="contained">Connect MetaMask</Button>
            </Box>
        </Box>
    </Container>
  )
}

