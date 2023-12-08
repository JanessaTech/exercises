import { Button } from '@mui/base'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'

export default function SimpleDialog({handleClose, open, address}) {
  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Close Dialog</DialogTitle>
        <DialogContent>
          <Typography>
            You must register name for address <strong>{address}</strong> before voting
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>  
    </Dialog>
  )
}

