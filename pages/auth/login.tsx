
import NextLink from 'next/link';
import { Grid, Typography, TextField, Button, Link } from '@mui/material';
import { Box } from '@mui/system';
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form';


type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = (data: FormData) => {
        console.log({ data });

    }
    return (
        <AuthLayout title='Login'>
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Iniciar sesión</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label='Correo electrónico' 
                                variant='filled' 
                                fullWidth 
                                { ...register('email')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                label='Constraseña' 
                                variant='filled' 
                                type='password' 
                                fullWidth 
                                { ...register('password')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                color='secondary'
                                fullWidth>
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