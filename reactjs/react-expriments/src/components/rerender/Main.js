import {Container } from '@mui/material'
import React from 'react'
import Header from './Header'

export default function Main(props) {
    console.log('Main rendering...')
  return (
    <Container maxWidth='false'>
        <Header/>
        {props.children}
    </Container>  
  )
}

