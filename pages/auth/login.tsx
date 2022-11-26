import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { tesloApi } from '../../api';


type FormData = {
    email    : string,
    password : string,
};

const LoginPage = () => {
    
    const router = useRouter();

    const { loginUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    
    const [showError, setShowError] = useState(false);


    const onLoginUser = async ({ email, password}: FormData) => {

        setShowError(false);

        const isValidLogin = await loginUser( email, password );

        if (!isValidLogin) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        };
        //TODO: Navegar a la página donde el usuario estaba

        router.replace('/');


    }
    return (
        <AuthLayout title='Login'>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Iniciar sesión</Typography>
                            <Chip
                                label="Usuario o contraseña incorrectos"
                                color="error"
                                icon={ <ErrorOutline />}
                                className="fadeIn"
                                style={{ display: showError ? 'flex' : 'none'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label='Correo electrónico' 
                                variant='filled' 
                                fullWidth 
                                { ...register('email', {
                                    required: 'Este campo es obligatorio',
                                    validate: validations.isEmail,
                                }
                                )}
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                label='Constraseña' 
                                variant='filled' 
                                type='password' 
                                fullWidth 
                                { ...register('password', {
                                    required: 'Este campo es obligatorio',
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message}
                    
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                color='secondary'
                                fullWidth
                                disabled={ showError }
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <Typography sx={{ mr: 1 }}>¿No tienes cuenta?</Typography>
                            <NextLink href='/auth/register' passHref>
                                <Link underline='always'>Regístrate.</Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage;