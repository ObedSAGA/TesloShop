import { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { CartContext } from '../../context';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { countries } from '../../utils';
import Cookies from 'js-cookie';




const SummaryPage = () => {

    const router = useRouter();
    const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);

    useEffect(() => {
       if (!Cookies.get('firstName')) {
            router.push('/checkout/address');
       } 
    }, [ router ])
    

    const onCreateOrder = () => {
        createOrder();

    }


    if (!shippingAddress) {
        return <></>;
    }


    const { firstName, lastName, address, address2 = '', city, zipcode, country, phone} = shippingAddress;

    return (
        <ShopLayout title='Resumen de la compra' pageDescription='Productos listos para comprar'>
            <Typography sx={{ mb: 2}} variant='h1' component='h1'>Resumen de compra</Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'}){ }</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>{ firstName } { lastName }</Typography>
                            <Typography>{ address }, { address2 }</Typography>
                            <Typography>CP: { zipcode }, { city }, { countries.find( c => c.code === country)?.name }</Typography>
                            <Typography> Telf: { phone }</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>


                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button
                                  color="secondary"
                                  className='circular-btn'
                                  fullWidth
                                  onClick={ createOrder }
                                >
                                    Confirmar pedido
                                </Button>

                            </Box>


                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage;