import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert,{ Color } from '@material-ui/lab/Alert'

interface ErrorNotificationProps {
  message: string
  severity: Color
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
