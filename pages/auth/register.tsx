import NextLink from 'next/link';
import { Grid, Typography, TextField, Button, Link } from '@mui/material';
import { Box } from '@mui/system';
import { AuthLayout } from '../../components/layouts'

const RegisterPage = () => {
  return (
    <AuthLayout title='Registro'>
        <Box sx={{ width: 350, padding: '10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Nueva cuenta</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Nombre' variant='filled' fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <TextField label='Correo electrónico' variant='filled' fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <TextField label='Contraseña' variant='filled' type='password' fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <TextField label='Repite la contraseña' variant='filled' type='password' fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <Button variant='contained' color='secondary' fullWidth>Enviar</Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='center'>
                    <Typography sx={{ mr: 1}}>¿Ya tiene cuenta?</Typography>
                    <NextLink href='/auth/login' passHref>
                        <Link underline='always'>Iniciar sesión.</Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>

        
    </AuthLayout>
    )
}

export default RegisterPage;