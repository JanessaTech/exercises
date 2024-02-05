import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    console.log('Header rendering...')
  return (
    <Box sx={{width:1, height:100}}>
        <Link to="/reactjs1">Reactjs 1</Link>
        <Link to="/reactjs2">Reactjs 2</Link>
    </Box>
  )
}

