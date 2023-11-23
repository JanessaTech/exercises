import { Box } from '@mui/material'
import { styled, createTheme, ThemeProvider } from '@mui/system';
import React from 'react'

const customTheme = createTheme({
  components: {
    MyThemeComponent: {
      styleOverrides: {
        root: {
          color: 'darkslategray',
        },
        primary: {
          color: 'darkblue',
        },
        secondary: {
          color: 'darkred',
          backgroundColor: 'pink',
        },
      },
      variants: [
        {
          props: { variant: 'dashed', color: 'primary' },
          style: {
            border: '5px dashed darkblue',
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: '1px dashed darkred',
          },
        },
      ],
    },
  },
});

const MyThemeComponent = styled('div', {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== 'color' && prop !== 'variant' && prop !== 'sx',
  name: 'MyThemeComponent',
  slot: 'Root',
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === 'primary' && styles.primary,
    props.color === 'secondary' && styles.secondary,
  ],
})(({ theme }) => ({
  backgroundColor: 'aliceblue',
  padding: theme.spacing(1),
}));


export default function CustomComponent() {
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{m: 3}}> 
        <MyThemeComponent sx={{ m: 1 }} color="primary" variant="dashed">
          Primary
        </MyThemeComponent>
        <MyThemeComponent sx={{ m: 1 }} color="secondary">
          Secondary
        </MyThemeComponent>     
      </Box>
    </ThemeProvider>
  )
}

