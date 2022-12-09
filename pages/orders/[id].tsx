import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { countries } from '../../utils';


interface Props {
    order: IOrder
}


const OrderPage: NextPage<Props> = ({ order }) => {


    const { shippingAddress } = order;

    return (
        <ShopLayout title='Confirmación de pedido' pageDescription='Confirmación de pedido a pagar'>
            <Typography variant='h1' component='h1'>Pedido: {order._id?.slice(0, 5) + '- E'}</Typography>


            {
                order.isPaid
                    ? (
                        <Chip
                            sx={{ my: 2 }}
                            label='Pago realizado'
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined />}
                        />
                    )

                    : (
                        <Chip
                            sx={{ my: 2 }}
                            label='Pendiente de pago'
                            variant='outlined'
                            color='error'
                            icon={<CreditCardOffOutlined />}
                        />

                    )
            }


            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList products={ order.orderItems } />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen de la compra</Typography>
                            <Divider sx={{ my: 1 }} />

                            

                            <Typography>{ shippingAddress.firstName } { shippingAddress.lastName}</Typography>
                            <Typography>{ shippingAddress.address } { shippingAddress.address2 ? shippingAddress.address2 : '' }</Typography>
                            <Typography>CP: { shippingAddress.zipcode }</Typography>
                            <Typography>{ shippingAddress.city }, { countries.find( c => c.code === shippingAddress.country)?.name } </Typography>
                            <Typography>Telf. { shippingAddress.phone }</Typography>

                            <Divider sx={{ my: 1 }} />


                            <OrderSummary orderValues={{ 
                                    numberOfItems: order.numberOfItems,
                                    subTotal: order.subTotal, 
                                    total: order.total, 
                                    tax: order.tax,
                                }}                               
                            />

                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>

                                {
                                    order.isPaid
                                    ? (
                                        <Chip
                                        sx={{ my: 2 }}
                                        label='Orden pagada'
                                        variant='outlined'
                                        color='success'
                                        icon={ <CreditScoreOutlined/> }
                                        />
                                    )
                                    : (
                                        <h1>Pagar</h1>

                                    )
                                }
                            </Box>


                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </ShopLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query
    const session: any = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    if (order.user !== session.user.id) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}

export default OrderPage;