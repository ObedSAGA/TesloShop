import NextLink from 'next/link';
import { Grid, Typography, Chip, Link } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';

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
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>Ver pedido</Link>
                </NextLink>
            )
        }
    }



];

const rows = [
    { id: '1', paid: true, fullName: 'Alberto Herrera' },
    { id: '2', paid: true, fullName: 'Melissa Flores' },
    { id: '3', paid: false, fullName: 'Andre Fernandez' },
    { id: '4', paid: true, fullName: 'Juan Acosta' },
    { id: '5', paid: false, fullName: 'Alex Marín' },
];


const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de pedidos'} pageDescription={'Historial de pedidos'}>
        <Typography variant='h1' component='h1'>Historial de pedidos</Typography>

        <Grid container sx={{ mt: 2}}>
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

export default HistoryPage;