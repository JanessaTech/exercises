import { Box } from '@mui/material'
import React from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export default function Header() {
    console.log('Header rendering...')
    /**
     * The follow codes will cause header to be rendered always:
     */
    //const navigate = useNavigate()
    //const location = useLocation()
    //const [searchParams, setSearchParams] = useSearchParams()
  return (
    <Box sx={{width:1, height:100}}>
        <Link to="/reactjs1">Reactjs 1</Link>
        <Link to="/reactjs2">Reactjs 2</Link>
    </Box>
  )
}

