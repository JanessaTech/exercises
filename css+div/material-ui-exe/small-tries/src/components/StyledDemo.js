import React from 'react'
import {  styled } from '@mui/material/styles';
import { Box, Slider } from '@mui/material';

const CustomSlider = styled(Slider, {
    shouldForwardProp: (prop) => prop !== 'myname',  
})(({myname, theme}) => ({
    width: 500,
    color: 'purple',
    ...(myname === 'jane' && {
        '& .MuiSlider-thumb':{
            '&:hover': {
                backgroundColor: 'red'
            },
            '&.Mui-active': {
                backgroundColor: theme.palette.success.main
            }
        }
    })
}))

export default function StyledDemo() {
  return (
    <Box sx={{m: 3}}>
        <CustomSlider defaultValue={50} myname={'jane'} aria-label="Default" valueLabelDisplay="auto" /> 
        <CustomSlider defaultValue={50} myname={'notJane'} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
  )
}

