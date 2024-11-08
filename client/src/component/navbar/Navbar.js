import React from 'react'
import Link from 'react-router-dom'
import {AppBar, Typography, Button, Toolbar } from "@mui/material"

function Navbar() {
  return (
   <AppBar>
    <Toolbar>
        <Typography variant="h4" sx={{flexGrow:1}}>
            Busness card
        </Typography>
        <Button>Login</Button>

    </Toolbar>
   </AppBar>
  )
}

export default Navbar