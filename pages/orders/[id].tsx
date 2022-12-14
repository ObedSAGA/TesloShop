import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import {  PayPalButtons,  } from '@paypal/react-paypal-js'
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { countries } from '../../utils';
import { tesloApi } from '../../api';
import { useRouter } from 'next/router';
import { useState } from 'react';

export type OrderResponseBody = {
    id: string;
    status:
        | "COMPLETED"
        | "SAVED"
        | "APPROVED"
        | "VOIDED"
        | "PAYER_ACTION_REQUIRED";
};




interface Props {
    order: IOrder
}


const OrderPage: NextPage<Props> = ({ order }) => {

    const router = useRouter()

    const [isPaying, setIsPaying] = useState(false)


    const { shippingAddress } = order;


    const onOrderCompleted = async( details: OrderResponseBody ) => {
        
        if ( details.status !== 'COMPLETED') {
            return alert('No se ha realizado pago en Paypal')
        }
        setIsPaying(true);
        try {
            const { data } = await tesloApi.post(`/orders/pay`, {
                transactionID: details.id,
                orderID: order._id,
            })

            router.reload();

        } catch (error) {
            setIsPaying(false);
           console.log(error);
           alert('Error') 
        }

    }


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


            <Grid container className="fadeIn">
                <Grid item xs={12} sm={7}>
                    <CartList products={ order.orderItems = order.orderItems.map( product => {
                        product.images = product.images.includes('http')
                        ? product.images
                        : `${ process.env.HOST_NAME}products/${ product.images }`;
                        return product;
                    })} />
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
                                
                                <Box
                                  display='flex'
                                  justifyContent='center'
                                  className='fadeIn'
                                  sx={{ display: isPaying ? 'flex' : 'none'}}
                                >
                                    <CircularProgress />
                                </Box>

                                <Box sx={{ display: isPaying ? 'none' : 'flex', flex: 1}} flexDirection="column">
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
                                        <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: `${order.total}`,
                                                        },
                                                    },
                                                ],
                                            });
                                        }}

                                        onApprove={(data, actions) => {
                                            return actions.order!.capture().then((details) => {
                                                
                                                onOrderCompleted(details)

                                                // console.log({ details });
                                                // const name = details.payer.name.given_name;
                                                // alert(`Transaction completed by ${name}`);
                                            });
                                        }}
                                        />

                                    )
                                }
                                </Box>

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