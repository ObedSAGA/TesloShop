import { useContext, useState } from 'react';

import { GetServerSideProps } from 'next'
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

import { useForm } from 'react-hook-form';

import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '../../components/layouts'

import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
    name: string
    email: string
    password: string
    passwordConf: string
};

const RegisterPage = () => {

    const router = useRouter();

    const { registerUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

    const onRegisterForm = async ({ name, email, password,  }: FormData) => {

        const { hasError, message } = await registerUser(name, email, password);
        
        setShowError(false);

        if ( hasError ) {
            setShowError(true);
            setMessage( message! );
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }

        //Navega a la página donde el usuario estaba mediante query parametros
        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination);


        await signIn('credentials', { email, password });
    
    }

    return (
        <AuthLayout title='Registro'>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Nueva cuenta</Typography>
                            <Chip
                                label="Usuario ya existe"
                                color="error"
                                icon={ <ErrorOutline />}
                                className="fadeIn"
                                style={{ display: showError ? 'flex' : 'none'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Nombre'
                                variant='filled'
                                fullWidth
                                {...register('name', {
                                    required: 'Este campo es obligatorio',
                                    minLength: { 
                                        value: 2, 
                                        message: 'Nombre debe tener al menos 2 carácteres'
                                    }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label='Correo electrónico'
                                variant='filled'
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es obligatorio',
                                    validate: validations.isEmail
                                })}
                                error={ !!errors.email } 
                                helperText={ errors.email?.message }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Contraseña'
                                variant='filled'
                                type='password'
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es obligatorio',
                                    minLength: {
                                        value: 6, 
                                        message: 'Contraseña debe tener al menos 6 carácteres'
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant='contained'
                                color='secondary'
                                fullWidth
                                type='submit'
                            >
                                Enviar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <Typography sx={{ mr: 1 }}>¿Ya tiene cuenta?</Typography>
                            <NextLink 
                               href={router.query.p ? `/auth/login?p=${ router.query.p }` : '/auth/login'}
                                passHref
                            >
                                <Link underline='always'>Iniciar sesión.</Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout> 
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req })

    const { p = '/' } = query
 
    if (session) {
        return{
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {  }
    }
}



export default RegisterPage;