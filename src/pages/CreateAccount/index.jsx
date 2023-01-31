import theme from '../../Utils/theme'
import { useState } from 'react'
import {
    Box, TextField, Typography, FormControlLabel, ThemeProvider,
    FormControl, InputLabel, Input, InputAdornment, IconButton, FormHelperText, Snackbar, Alert, Slide, Button
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { validadeEmail, validadePassword } from '../../Utils/validadorores';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../service/firebaseConfig'

const CreateAccount = () => {

  async function CreateAccount(email, password){
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode, errorMessage)

        });
    }

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

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
    // <<-- Validade Email and Pass -->>

    // <<-- Hiden and show Password code -->>

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // <<-- Hiden and show Password code -->>

    return (
            <Box sx={{
                width: '100vw', height: '100vh', padding: '0', margin: '0', boxSizing: 'border-box', display: 'flex',
                justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0e0e0'
            }}>

                <Box component='form' autoComplete='off' sx={{
                    width: 400, height: 500, margin: 'auto 0 auto 0', borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: '1rem', backgroundColor: '#ffff'
                }}>
                    <Typography variant='h5' sx={{ mt: '1rem', fontFamily: 'roboto' }}>
                        Create Account
                    </Typography>
                    <TextField name='Email' error={errorEmail.error} helperText={errorEmail.helperText} onChange={handleChange} variant='standard' label='Email' type='email' sx={{ mt: '1rem', width: '70%' }} />

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

                    <Button onClick={()=>CreateAccount(email, password)} variant="contained" sx={{ mt: '2rem', width: '70%' }}>Create Account</Button>

                    <Typography sx={{ mt: '1rem', fontFamily: 'roboto' }}>
                        Already got an account? Go to
                        <Link to='/' style={{ textDecoration: 'none' }}> Login Page</Link>
                    </Typography>

                </Box>
            </Box>
    )
}

export default CreateAccount