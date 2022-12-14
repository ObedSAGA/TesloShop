import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimits } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { SummaryTile } from '../../components/admin'
import { AdminLayout } from '../../components/layouts'

function DashboardPage() {
  return (
    <AdminLayout
        title='Dashboard'
        subtitle='Estadísticas generales'
        icon={ <DashboardOutlined/> }
    >
        <Grid container spacing={2}>

            <SummaryTile 
                title={1} 
                subtitle={'Pedidos'} 
                icon={ <CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }}/>}            
            />

            <SummaryTile 
                title={2} 
                subtitle={'Pedidos pagados'} 
                icon={ <AttachMoneyOutlined color='success' sx={{ fontSize: 40 }}/>}            
            />

            <SummaryTile 
                title={3} 
                subtitle={'Pendientes de pago'} 
                icon={ <CreditCardOffOutlined color='error' sx={{ fontSize: 40 }}/>}            
            />

            <SummaryTile 
                title={4} 
                subtitle={'Clientes'} 
                icon={ <GroupOutlined color='primary' sx={{ fontSize: 40 }}/>}            
            />

            <SummaryTile 
                title={5} 
                subtitle={'Productos'} 
                icon={ <CategoryOutlined color='warning' sx={{ fontSize: 40 }}/>}            
            />

            <SummaryTile 
                title={6} 
                subtitle={'Productos agotados'} 
                icon={ <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }}/>}            
            />

            <SummaryTile 
                title={7} 
                subtitle={'Bajo inventario'} 
                icon={ <ProductionQuantityLimits color='warning' sx={{ fontSize: 40 }}/>}            
            />

            <SummaryTile 
                title={8} 
                subtitle={'Actualización en:'} 
                icon={ <AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }}/>}            
            />


        </Grid>
    </AdminLayout>
  )
}

export default DashboardPage
