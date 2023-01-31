import { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { validadeEmail, validadePassword } from '../../Utils/validadorores';
import { AuthFirebaseContext } from '../../context/authFirebase';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Box, TextField, Typography, Checkbox, FormControlLabel, Grow,
  FormControl, InputLabel, Input, InputAdornment, IconButton, FormHelperText, Snackbar, Alert, Button
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



const Login = () => {

  // <<-- Login Firebase -->>

  const { signInFirebase, signInGoogle, signed } = useContext(AuthFirebaseContext)


  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  async function handleLoginFirebase() {
    return await signInFirebase(email, password)

  }

  // <<-- Login Google -->>

  async function handleLoginGoogle() {
    await signInGoogle()

  }

  // <<-- Validade Email and Pass -->>
  const [errorEmail, seterrorEmail] = useState({
    error: false,
    helperText: ''
  })

  const [errorPass, seterrorPass] = useState({
    error: false,
    hidden: true
  })

  const handleChange = (event) => {

    if (event.target.name === 'Email') {
      setEmail(event.target.value)
      if (validadeEmail(event.target.value) === false) {
        seterrorEmail({ error: true, helperText: 'Invalid Format' })
      } else {
        seterrorEmail({
          error: false,
          helperText: ''
        })
      }
    }

    if (event.target.name === 'Password') {
      setPassword(event.target.value)
      if (validadePassword(event.target.value) === false) {
        seterrorPass({ error: true, hidden: false })
      } else {
        seterrorPass({
          error: false,
          hidden: true
        })
      }
    }

  }

  // <<-- Hiden and show Password code -->>

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // <<-- Snack Alert -->>

  const [openSnack, setOpenSnack] = useState(false)

  const handleOpenSnack = () => {
    setOpenSnack(true)
  }

  const handleCloseSnack = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnack(false)
  };

  if (!signed) {
    return (
      <Box sx={{
        width: '100vw', height: '100vh', padding: '0', margin: '0', boxSizing: 'border-box', display: 'flex',
        justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0e0e0'
      }}>

        <Box component='form' sx={{
          width: 400, height: 550, margin: 'auto 0 auto 0', borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '1rem', backgroundColor: '#ffff'
        }}>

          <Typography variant='h5' sx={{ fontFamily: 'roboto', alignSelf: 'flex-start', pt: '2rem', ml: '4rem' }}>
            Hey,Hello 👋
          </Typography>

          <TextField name='Email' error={errorEmail.error} helperText={errorEmail.helperText}
            onChange={handleChange} variant='standard' label='Email' type='email' autoComplete="email" sx={{ mt: '1rem', width: '70%' }} />

          <FormControl error={errorPass.error} sx={{ mt: '1rem', width: '70%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              name='Password' onChange={handleChange} type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText hidden={errorPass.hidden} >Between 6 and 20 characters</FormHelperText>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '70%' }}>
            <FormControlLabel control={<Checkbox />} label="Remember" />
            <Typography sx={{ fontFamily: 'roboto' }}>
              <Link to='/' style={{ textDecoration: 'none' }}> Forgot Password?</Link>
            </Typography>
          </Box>


          <Button onClick={() => handleLoginFirebase().then((result) => {
            result ? '' : handleOpenSnack()
          })} variant="contained" sx={{ mt: '1rem', width: '70%' }}>Login</Button>

          <Typography sx={{ fontFamily: 'roboto', fontWeight: '400' }}>
            ----------- OR -----------
          </Typography>

          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Button onClick={() => handleLoginGoogle()} variant="outlined<" startIcon={<GoogleIcon />}
              sx={{ width: '33%', border: 'solid 1px #000', }}></Button>

            <Button onClick={() => handleLoginGoogle()} variant="outlined<" startIcon={<GitHubIcon />}
              sx={{ width: '33%', border: 'solid 1px #000', }}></Button>
          </Box>

          <Typography sx={{ mt: '.5rem', fontFamily: 'roboto' }}>
            Not Registred yet?
            <Link to='/CreateAccount' style={{ textDecoration: 'none' }}> Create an Account</Link>
          </Typography>
        </Box>

        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnack}
          autoHideDuration={4000} onClose={handleCloseSnack} TransitionComponent={Grow}>
          <Alert onClose={handleCloseSnack} variant='filled' severity="error" sx={{ width: '100%' }}>
            Incorrect email or password
          </Alert>
        </Snackbar>

      </Box>

    )
  } else {
    return <Navigate to='/Home' />
  }

}

export default Login