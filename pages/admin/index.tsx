import { useEffect, useState } from 'react'
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimits } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import useSWR from 'swr'
import { SummaryTile } from '../../components/admin'
import { AdminLayout } from '../../components/layouts'
import { DashboardSummaryReponse } from '../../interfaces'

function DashboardPage() {

    const { data, error } = useSWR<DashboardSummaryReponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000, // 30 seconds
    })

    const [refreshIn, setRefreshIn] = useState(30);

    // Countador de 30 segundos
    useEffect(() => {
        const interval = setInterval(() =>{
            console.log('Tick');
            setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30  );
        }, 1000)

        return () => clearInterval( interval )
    }, [])
    // End contador

    if (!error && !data) {
        return <></>
    }

    if (error) {
        console.log(error);
        return <Typography>Error al cargar la información</Typography>

    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoStock,
        productsWithLowStock,
        notPaidOrders,
    } = data!;

    return (
        <AdminLayout
            title='Dashboard'
            subtitle='Estadísticas generales'
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>

                <SummaryTile
                    title={numberOfOrders}
                    subtitle={'Pedidos'}
                    icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />

                <SummaryTile
                    title={paidOrders}
                    subtitle={'Pedidos pagados'}
                    icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
                />

                <SummaryTile
                    title={notPaidOrders}
                    subtitle={'Pendientes de pago'}
                    icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
                />

                <SummaryTile
                    title={numberOfClients}
                    subtitle={'Clientes'}
                    icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
                />

                <SummaryTile
                    title={numberOfProducts}
                    subtitle={'Productos'}
                    icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
                />

                <SummaryTile
                    title={productsWithNoStock}
                    subtitle={'Productos agotados'}
                    icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
                />

                <SummaryTile
                    title={productsWithLowStock}
                    subtitle={'Bajo inventario'}
                    icon={<ProductionQuantityLimits color='warning' sx={{ fontSize: 40 }} />}
                />

                <SummaryTile
                    title={refreshIn}
                    subtitle={'Actualización en:'}
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />


            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage
