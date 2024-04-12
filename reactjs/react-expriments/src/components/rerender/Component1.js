import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Component1() {
    console.log('Component1 rendering...')
  return (
    <Box>
        Component1
        <Link to="/reactjs2">Reactjs 2</Link>
    </Box>
  )
}

