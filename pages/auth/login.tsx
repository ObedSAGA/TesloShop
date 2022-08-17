
import NextLink from 'next/link';
import { Grid, Typography, TextField, Button, Link } from '@mui/material';
import { Box } from '@mui/system';
import { AuthLayout } from '../../components/layouts'

const LoginPage = () => {
  return (
    <AuthLayout title='Login'>
        <Box sx={{ width: 350, padding: '10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Iniciar sesión</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Correo electrónico' variant='filled' fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <TextField label='Constraseña' variant='filled' type='password' fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <Button variant='contained' color='secondary' fullWidth>Login</Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='center'>
                    <Typography sx={{ mr: 1}}>¿No tienes cuenta?</Typography>
                    <NextLink href='/auth/register' passHref>
                        <Link underline='always'>Regístrate.</Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>

        
    </AuthLayout>
    )
}

export default LoginPage;