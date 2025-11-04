import {Box, Paper, Stack, Typography, Button, Alert} from '@mui/material' 
import {FcGoogle} from 'react-icons/fc'
import GitHubIcon from '@mui/icons-material/GitHub';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { gitHubProvider, auth, googleProvider } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Authentication() {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const googleSign = async ()=>{
    setLoading(true);
    try{
      await signInWithPopup(auth, googleProvider);
    }
    catch(err){
      setError(true);
      setTimeout(() => {
        setError(false)
      }, 4000);
      console.log("Sign-Error: ", err)
    }
    finally{
      setLoading(false);
    }
  }

  onAuthStateChanged(auth, (user)=>{
    if(user){
      navigate('/')
    }
  })

  const gitHubSign = async ()=>{
    setLoading(true);
    try{
      await signInWithPopup(auth, gitHubProvider);
    }
    catch(err){
      setError(true);
      setTimeout(() => {
        setError(false)
      }, 4000);
      console.log("Sign-Error: ", err)
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <Box sx={{bgcolor: 'hsl(0 0% 80%)',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%'}}>
      <Paper sx={{bgcolor: 'hsl(0 0% 85%)'}}>
        <Stack padding={5} spacing={4}>
          <Typography variant='h3' textAlign={'center'}>Sign In</Typography>
          <Stack spacing={2}>
            <Button onClick={googleSign} disabled={loading} sx={{bgcolor: 'white', color: 'black'}} startIcon={<FcGoogle/>} variant='contained'>Continue with google</Button>
            <Button onClick={gitHubSign} disabled={loading} sx={{bgcolor: 'black'}} startIcon={<GitHubIcon/>} variant='contained'>Continue with github</Button>
          </Stack>
        </Stack>
      </Paper>
      {error && <Alert severity="error" sx={{ mt: 1,width: '80%', p: 1, position: 'fixed', top: '0'}}>Failed to Sign In | Try again</Alert>}
    </Box>
  )
}

export default Authentication