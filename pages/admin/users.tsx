import { useEffect, useState } from 'react';
import { PeopleOutline } from '@mui/icons-material';
import useSWR from 'swr';
import { AdminLayout } from '../../components/layouts';
import { DataGrid, GridColDef, GridRenderCellParams, } from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from '@mui/material';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';


const UsersPage = () => {


  const { data, error } = useSWR<IUser[]>( '/api/admin/users' );
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if( data )
      setUsers( data );
  }, [data]);
  

  if (!data && !error) return (<></>);


  const onRoleUpdated = async( userID: string, newRole: string) => {

    const previusUsers = users.map( user => ({ ...user }))
    const updatedUsers = users.map(user => ({
      ...user,
      role: userID === user._id ? newRole : user.role
    }))

    setUsers( updatedUsers );

    try {
      await tesloApi.put( '/admin/users', { userID, role: newRole});

    } catch (error) { 
      setUsers( previusUsers );
      console.log(error);
      alert('No se pudo actualizar el usuario');
    }

  }


  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Nombre', width: 300 },
    { field: 'role', 
      headerName: 'Rol', 
      width: 300,
      renderCell: ({row}: GridRenderCellParams ) => {

        return (
          <Select
            value={row.role}
            label="Rol de usuario"
            sx={{ width: 300 }}
            onChange={ ({target}) => onRoleUpdated( row.id,  target.value)}
          >
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='manager'>Manager</MenuItem>
            <MenuItem value='client'>Client</MenuItem>
          </Select>
        )
      }
    
    },
  ];

  const rows = users.map( user => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title={'Usuarios'}
      subtitle={'Gestión de usuarios'}
      icon={<PeopleOutline />}
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

export default UsersPage
