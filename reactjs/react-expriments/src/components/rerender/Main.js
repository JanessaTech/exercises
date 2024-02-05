import { Box } from '@mui/material'
import React from 'react'
import { useOutlet } from 'react-router-dom'
import Header from './Header'

export default function Main(props) {
    console.log('Main rendering...')
    const outlet = useOutlet()
  return (
    <Box>
        <Header/>
        {props.children}
    </Box>
  )
}

