import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';




const SummaryPage = () => {
  return (
    <ShopLayout title='Resumen de la compra' pageDescription='Productos listos para comprar'>
        <Typography variant='h1' component='h1'>Resumen de compra</Typography>
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
                            <Button color="secondary" className='circular-btn' fullWidth>
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