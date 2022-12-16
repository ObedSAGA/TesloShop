import { GetServerSideProps, NextPage } from 'next';
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../../components/cart';
import { AdminLayout } from '../../../components/layouts';
import { ConfirmationNumberOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { countries } from '../../../utils';



interface Props {
    order: IOrder
}


const OrderPageAdmin: NextPage<Props> = ({ order }) => {


    const { shippingAddress } = order;


    return (
        <AdminLayout
          title='Resumen
          del
          pedido'
          subtitle={`Pedido:
          ${order._id?.slice(0,
          5)}
          -
          E`}
          icon={<ConfirmationNumberOutlined />}
        >
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
                                <Box sx={{ display: 'flex', flex: 1}} flexDirection="column">
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
                                        <Chip
                                        sx={{ my: 2 }}
                                        label='Pendiente de pago'
                                        variant='outlined'
                                        color='error'
                                        icon={ <CreditCardOffOutlined/> }
                                        />

                                    )
                                }
                                </Box>

                            </Box>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </AdminLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query
    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/admin/orders/',
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

export default OrderPageAdmin;