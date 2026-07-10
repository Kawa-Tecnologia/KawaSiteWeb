import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertColor } from '@mui/material/Alert'

interface ErrorNotificationProps {
  message: string
  severity: AlertColor
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  severity = 'error'
}) => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={100000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert
        elevation={6}
        variant='filled'
        severity={severity}
        onClose={handleClose}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

export default ErrorNotification
