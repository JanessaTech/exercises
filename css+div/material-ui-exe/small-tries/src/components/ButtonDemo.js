import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import React from 'react'
import { Box } from '@mui/material';
import { teal, blue} from '@mui/material/colors';


// This example shows how to use custom them to defined globle styling
const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        size: 'large'
      },
      styleOverrides: {
        root: ({ownerState, theme}) => ({
          ...(ownerState.variant === 'contained' && {
            color: theme.palette.secondary.main,
            textDecoration: 'underline'
          })
        }),
        sizeLarge: {
          fontSize: '2rem',
          borderRadius: 10, // pixel
          '&:hover': {
            backgroundColor:teal[500],
            textDecoration: 'underline'
          },
          '&:active': {
            backgroundColor:teal[700]
          },
          backgroundColor:teal[300]
        }
      },
      variants: [ 
        {
          props: { variant: 'dashed'},
          style: {
            border: `2px dashed ${blue[500]}`,
          }
        }

      ]
    }
  }
})

export default function ButtonDemo() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{m: 3}}>
        <Button variant="contained">Contained</Button>
        <Button variant="dashed">dashed</Button>
      </Box>
    </ThemeProvider>
    
  )
}

