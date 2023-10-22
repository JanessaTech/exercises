import { Box, TextField } from '@mui/material'
import React from 'react'

export default function FocusDemo() {
  return (
    <Box sx={{m: 3}}>
        <TextField id="standard-basic" label="Standard" variant="standard" className='myTextField'/>
    </Box>
  )
}

