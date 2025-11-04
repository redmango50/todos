import {AppBar, Toolbar, Avatar, IconButton, Menu, MenuItem, Typography} from '@mui/material'
import {auth} from '../firebase'
import { useState } from 'react';
import { signOut } from "firebase/auth";
import { useContext } from 'react';
import { logContext } from '../logContext';

const NavBar = () => {
  const ctx = useContext(logContext)

  if (!ctx) {
    throw new Error("must be used within a logContext.Provider");
  }

  const {log, setLog} = ctx
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async()=>{
    try{
        await signOut(auth)
    }
    catch{
        setLog("Error while sign-out")
    }
    finally{
        handleClose();
    }
  }

  return (
    <>
    <AppBar
  position="fixed"
  sx={{ width: {xs: '95%', sm: '65%'}, left: '50%', transform: 'translateX(-50%)', borderRadius: 2, top: 16 }}>
        <Toolbar>
            <Typography variant='subtitle1' sx={{color: 'hsl(0 0% 90%)', fontSize: {xs: '0.8rem', sm: '1rem'}}}>LOG: {log ||  "No log available"}</Typography>
            <IconButton onClick={handleClick} sx={{ml: 'auto'}}>
                <Avatar src={auth.currentUser?.photoURL || undefined}/>
            </IconButton>
        </Toolbar>
    </AppBar>
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'Profile-Menu',
          },
        }}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default NavBar