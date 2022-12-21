import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Grid, Link, Typography, CardActionArea, CardMedia, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';



interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products  }) => {

  const { cart, updateCartQuantity, removeProductCart } = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity( product );
  }

  const productsToShow = products ? products : cart;

  return (
    <>
      {
        productsToShow.map(product => (
          <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={product.images}
                      component="img"
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>Talla: <strong>{ product.size }</strong></Typography>


                {
                  editable
                    ? (

                      <ItemCounter
                        currentValue={product.quantity}
                        maxValue={10}
                        updateQuantity={( value ) => onNewCartQuantityValue( product as ICartProduct, value)}
                      />

                    )
                    : (

                      <Typography variant='body1'>Cantidad: <strong>{ product.quantity } {product.quantity > 1 ? 'productos' : 'producto'}</strong></Typography>
                    )

                }
              </Box>

            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>{ product.price }€</Typography>

              {
                editable && (
                  <IconButton 
                    onClick={ () => removeProductCart( product as ICartProduct ) }
                    aria-label='Eliminar' 
                    color='secondary'
                  >
                    <DeleteIcon />
                  </IconButton>
                )
              }




            </Grid>

          </Grid>
        ))
      }
    </>
  )
}
