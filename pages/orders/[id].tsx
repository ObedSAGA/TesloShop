import NextLink from 'next/link';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';


const OrderPage = () => {
  return (
    <ShopLayout title='Confirmación de pedido 4964644545' pageDescription='Confirmación de pedido a pagar'>
        <Typography variant='h1' component='h1'>Pedido: 51515</Typography>
        
        {/* <Chip
            sx={{ my: 2 }}
            label='Pendiente de pago'
            variant='outlined'
            color='error'
            icon={ <CreditCardOffOutlined/>}
        /> */}
        <Chip
            sx={{ my: 2 }}
            label='Pago realizado'
            variant='outlined'
            color='success'
            icon={ <CreditScoreOutlined/>}
        />
        
        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList />
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen</Typography>
                        <Divider sx={{ my: 1}}/>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography>Alberto Herrera</Typography>
                        <Typography>C/ Hortes 76 2-1</Typography>
                        <Typography>CP: 08005 Barcelona, España </Typography>
                        <Typography>+34 622 90 90 90</Typography>

                        <Divider sx={{ my: 1}}/>

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>


                        <OrderSummary/>
                        
                        <Box sx={{ mt: 3}}>
                            {/* TODO:  */}
                            <h1>Pagar</h1>
                            
                        </Box>


                    </CardContent>
                </Card>

            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage;