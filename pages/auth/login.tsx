import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next'
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';

import { Box, Grid, Typography, TextField, Button, Link, Chip, Divider } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';


type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const router = useRouter();
    // const { loginUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov);
        })
    }, [])



    const onLoginUser = async ({ email, password }: FormData) => {

        setShowError(false);

        // THIS WAS USED WITH OUT CUSTOM AUTHENTICATION BUT WITH NEXT-AUTH IS NO NECESARY
        // const isValidLogin = await loginUser( email, password );
        // if (!isValidLogin) {
        //     setShowError(true);
        //     setTimeout(() => {
        //         setShowError(false);
        //     }, 3000);
        //     return;
        // };
        // //Navega a la página donde el usuario estaba mediante query parametros
        // const destination = router.query.p?.toString() || '/'
        // console.log(destination);
        // router.replace(destination);

        await signIn('credentials', { email, password });


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
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                style={{ display: showError ? 'flex' : 'none' }}
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
                                    validate: validations.isEmail,
                                }
                                )}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Constraseña'
                                variant='filled'
                                type='password'
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es obligatorio',
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                color='secondary'
                                fullWidth
                                disabled={showError}
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <Typography sx={{ mr: 1 }}>¿No tienes cuenta?</Typography>
                            <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} passHref>
                                <Link underline='always'>Regístrate.</Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center'>
                            <Divider sx={{ with: '100%', mb: 2 }} />
                            {
                                Object.values(providers)
                                    .filter((provider: any) => provider.id !== 'credentials')
                                    .map((provider: any) => {
                                        return (
                                            <Button
                                                key={provider.id}
                                                variant='contained'
                                                fullWidth
                                                color='primary'
                                                sx={{ mb: 1 }}
                                                onClick={() => signIn( provider.id )} 
                                            >
                                                {provider.name}
                                            </Button>
                                        )
                                    })
                            }
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
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}


export default LoginPage;