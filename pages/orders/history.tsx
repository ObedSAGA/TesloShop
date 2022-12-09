import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';

import { Grid, Typography, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Nombre completo', width: 300 },

    {
        field: 'paid', 
        headerName: 'Estado de pago', 
        width: 150,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid 
                    ? <Chip label='Pagado' color='success' variant='outlined' />
                    : <Chip label='Pendiente' color='error' variant='outlined'/>
            )
        }
    },

    {
        field: 'link', 
        headerName: 'Resumen de pedido', 
        width: 150,
        sortable: false,
        renderCell: (params: GridValueGetterParams ) => (
            
                <NextLink href={`/orders/${params.row.orderID}`} passHref>
                    <Link underline='always'>Ver pedido</Link>
                </NextLink>
        )
    }



];



interface Props {
    orders: IOrder[]
}


const HistoryPage: NextPage<Props> = ( { orders } ) => {

    const rows = orders.map( (order, idx) => ({
        id: idx + 1,
        paid: order.isPaid,
        fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`, 
        orderID: order._id
    }))
    

  return (
    <ShopLayout title={'Historial de pedidos'} pageDescription={'Historial de pedidos'}>
        <Typography variant='h1' component='h1'>Historial de pedidos</Typography>

        <Grid container className="fadeIn" sx={{ mt: 2}}>
            <Grid item xs={12} sx={{ height: 550, width: '100%' }}>
                <DataGrid 
                    columns={columns} 
                    rows={rows} 
                    pageSize={10}
                    rowsPerPageOptions={ [10] }
                />
            </Grid>
        </Grid>


    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req });

    

    if ( !session ) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            }        
        }
    }

    const orders = await dbOrders.getOrderByUser( session.user.id )
    

    return {
        props: {
            orders
        }
    }
}




export default HistoryPage;