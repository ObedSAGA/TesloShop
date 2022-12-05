import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ShopLayout } from '../../components/layouts';
import { countries, jwt } from '../../utils';
import Cookies from 'js-cookie';


type FormData = {
    firstName   : string;
    lastName    : string;
    address     : string;
    address2?   : string;
    zipcode     : string;
    city        : string;
    country     : string;
    phone       : string;

}



const AdressPage = () => {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '', 
            address: '',  
            address2: '',
            zipcode: '',  
            city: '',     
            country: '',  
            phone: '',    
        }
    });

const onSubmitAdress = ( data: FormData ) => {
    console.log(data);
    Cookies.set('firstName', data.firstName)
    Cookies.set('lastName', data.lastName)
    Cookies.set('address', data.address)
    Cookies.set('address2', data.address2 || '')
    Cookies.set('zipcode', data.zipcode)
    Cookies.set('city', data.city)
    Cookies.set('country', data.country)
    Cookies.set('phone', data.phone)

    router.push('/checkout/summary');
    
}



    return (
        <ShopLayout title='Dirección del cliente' pageDescription={'Confirma la dirección de envío'}>
            
            <form onSubmit={ handleSubmit(onSubmitAdress)}>
            <Typography variant='h1' component='h1'>Dirección</Typography>
        
            <Grid container spacing={2} sx={{ mt: 2}}>
                <Grid item xs={12} sm={6}>
                    <TextField
                      label='Nombre'
                      variant='filled'
                      fullWidth
                      { ...register('firstName', {
                        required: 'Este campo es obligatorio',
                    })}
                        error={ !!errors.firstName }
                        helperText={ errors.firstName?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                      label='Apellido'
                      variant='filled'
                      fullWidth
                      { ...register('lastName', {
                        required: 'Este campo es obligatorio',
                    })}
                        error={ !!errors.lastName }
                        helperText={ errors.lastName?.message }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                      label='Dirección'
                      variant='filled'
                      fullWidth
                      { ...register('address', {
                        required: 'Este campo es obligatorio',
                    })}
                        error={ !!errors.address }
                        helperText={ errors.address?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                      label='Dirección
                      2'
                      variant='filled'
                      fullWidth
                      { ...register('address2') }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                      label='Código
                      Postal'
                      variant='filled'
                      fullWidth
                      { ...register('zipcode', {
                        required: 'Este campo es obligatorio',
                    })}
                        error={ !!errors.zipcode }
                        helperText={ errors.zipcode?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                      label='Ciudad'
                      variant='filled'
                      fullWidth
                      { ...register('city', {
                        required: 'Este campo es obligatorio',
                    })}
                        error={ !!errors.city }
                        helperText={ errors.city?.message }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>País</InputLabel>
                        <Select
                            variant='filled'
                            defaultValue="" 
                            fullWidth
                            { ...register('country', {
                                required: 'Este campo es obligatorio',
                            })}
                                error={ !!errors.country }                        >

                            {
                                countries.map( country => (
                                    <MenuItem
                                      key={
                                      country.code
                                      }
                                      value={country.code}>{
                                      country.name
                                      }</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                      label='Teléfono'
                      variant='filled'
                      fullWidth
                      { ...register('phone', {
                        required: 'Este campo es obligatorio',
                    })}
                        error={ !!errors.phone }
                        helperText={ errors.phone?.message }
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button type="submit" color='secondary' className='circular-btn' size='large'>Continuar</Button>
            </Box>

            </form>

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const { token = ''} = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken( token );
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    if ( !isValidToken ) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default AdressPage;
