import { ShopLayout } from '../components/layouts/ShopLayout';
import { Box, Typography } from '@mui/material';


const Custom404 = () => {
  return (
    <ShopLayout title='Página no encontrada' pageDescription='Vulve a realizar una busqueda'>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{flexDirection: {xs: 'column', sm: 'row'}}}
        >
            <Typography variant='h1' component='h1' fontSize={50} fontWeight={200}>
                404 | 
            </Typography>
            <Typography marginLeft={2}>
                No encontramos el producto que buscas
            </Typography>
        </Box>
    </ShopLayout>
  )
}

export default Custom404