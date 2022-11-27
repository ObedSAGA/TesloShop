
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartContext } from '../../context';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';




const CartPage = () => {

    const { isLoaded, cart } = useContext(CartContext);

    const router = useRouter();

    useEffect(() => {
      if ( isLoaded && cart.length === 0 ) {
        router.replace('/cart/empty')
      }
    }, [isLoaded, cart, router]);

    if ( !isLoaded || cart.length === 0 ) { 
        return ( <></> )
        
    }

    return (
        <ShopLayout title='Cesta - 3 productos añadidos' pageDescription='Productos en cesta listos para comprar'>
            <Typography variant='h1' component='h1'>Tu cesta</Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Pedido</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color="secondary" className='circular-btn' fullWidth>
                                    Pagar
                                </Button>

                            </Box>


                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default CartPage