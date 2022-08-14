import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Button, Box } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const AdressPage = () => {
    return (
        <ShopLayout title='Dirección del cliente' pageDescription={'Confirma la dirección de envío'}>
            <Typography variant='h1' component='h1'>Dirección</Typography>

            <Grid container spacing={2} sx={{ mt: 2}}>
                <Grid item xs={12} sm={6}>
                    <TextField label='Nombre' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Apellido' variant='filled' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Dirección' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Dirección 2' variant='filled' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Código Postal' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Ciudad' variant='filled' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>País</InputLabel>
                        <Select
                            variant='filled'
                            fullWidth
                        >
                            <MenuItem value={1}>Costa Rica</MenuItem>
                            <MenuItem value={2}>México</MenuItem>
                            <MenuItem value={3}>Argentina</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Teléfono' variant='filled' fullWidth />
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button color='secondary' className='circular-btn' size='large'>Continuar</Button>
            </Box>

        </ShopLayout>
    )
}

export default AdressPage
