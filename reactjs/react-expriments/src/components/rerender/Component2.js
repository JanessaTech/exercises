import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Component2() {
    console.log('Component2 rendering...')
  return (
    <Box>
        Component2
        <Link to="/reactjs1">Reactjs 1</Link>
    </Box>
  )
}

