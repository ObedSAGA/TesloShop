import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';


const EmptyPage = () => {
  return (
    <ShopLayout title='Cesta vacía' pageDescription='No hay ningún producto agregado'>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{flexDirection: {xs: 'column', sm: 'row'}}}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }}/>
            <Box display='flex' flexDirection='column' alignItems='center' mt={2}>
                <Typography variant='h4'>La cesta está vacía</Typography>
                <NextLink href='/' passHref>
                    <Link typography='h5' color='secondary'>
                        Volver a la tienda
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
  )
}

export default EmptyPage