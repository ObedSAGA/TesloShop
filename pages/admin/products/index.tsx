import NextLink from 'next/link';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IProduct } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';



const columns:GridColDef[] = [
  { 
    field: 'img', 
    headerName: 'Foto', 
    renderCell: ({ row }: GridRenderCellParams ) => {
        return (
            <a href={ `/products/${ row.slug }`} target="_blank" rel="noreferrer" >
                <CardMedia 
                    component='img'
                    alt={ row.title }
                    className='fadeIn'
                    image={`/products/${ row.img }`}
                />
            </a>
        )
    }
},
  { 
    field: 'title', 
    headerName: 'Nombre del producto', 
    width: 250,
    renderCell: ( {row}: GridRenderCellParams ) => {
      return (
        <NextLink href={`/admin/products/${ row.slug }`} passHref>
          <Link underline='always'>
            { row.title }
          </Link>
        </NextLink>
      )
    }
    },
  { field: 'gender', headerName: 'Género'},
  { field: 'type', headerName: 'Tipo'},
  { field: 'inStock', headerName: 'Existencias'},
  { field: 'price', headerName: 'Precio'},
  { field: 'sizes', headerName: 'Tallas', width: 250},
];


const ProductsPage = () => {

  const { data, error } = useSWR<IProduct[]>('/api/admin/products')
  if ( !data && !error ) return (<></>);

  const rows = data!.map( product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug,
  }))

  return (
    <AdminLayout
      title={`Productos (${ data?.length })`}
      subtitle='Gestión de productos'
      icon={<CategoryOutlined />}
    >

      <Box display='flex' justifyContent='end' sx={{ mb: 2}}>
        <Button
          startIcon={ <AddOutlined /> }
          color='secondary'
          href='/admin/products/new'
        >
          Añadir producto
        </Button>
      </Box>

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

export default ProductsPage;