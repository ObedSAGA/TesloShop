import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { AdminLayout } from '../../../components/layouts';
import { IUser } from '../../../interfaces';
import { IOrder } from '../../../interfaces/order';


const columns:GridColDef[] = [
  { field: 'id', headerName: 'Pedido ID', width: 250},
  { field: 'email', headerName: 'Email', width: 200},
  { field: 'name', headerName: 'Nombre', width: 200},
  { field: 'total', headerName: 'Total', width: 120},
  { 
    field: 'isPaid', 
    headerName: 'Estado',
    width: 150,
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid
      ? ( <Chip variant='outlined' label='Pagado' color='success'/>)
      : ( <Chip variant='outlined' label='Pendiente' color='error'/>)
    }
  
  },
  { field: 'noProducts', headerName: 'No. Productos', align: 'center'},
  { 
    field: 'check', 
    headerName: 'Ver pedido',
    width: 150,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={ `/admin/orders/${ row.id }`} target="_blank" rel="noreferrer">
          Ver pedido
        </a>
      )
    }
  
  },
  { field: 'createdAt', headerName: 'Fecha', width: 200},
];




const OrdersPage = () => {

  const { data, error } = useSWR<IOrder[]>('/api/admin/orders')
  if ( !data && !error ) return (<></>);

  const rows = data!.map( order => ({
      id: order._id,
      email: (order.user as IUser).email,
      name: (order.user as IUser).name,
      total: order.total,
      isPaid: order.isPaid,
      noProducts: order.numberOfItems,
      createdAt: order.createdAt,

  }))

  return (
    <AdminLayout
      title='Pedidos'
      subtitle='Gestión de pedidos'
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn" sx={{ mt: 2 }}>
        <Grid item xs={12} sx={{ height: 550, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>

    </AdminLayout>
  )
}

export default OrdersPage
