import { FC } from "react";
import { Grid } from '@mui/material';

interface Props {
    products: IProduct[];
}

export const ProductList: FC<Props> = ({products}) => {
  return (
    <Grid container spacing={4}>
        {
            products.map(product => (
        }
    </Grid>
  )
}
