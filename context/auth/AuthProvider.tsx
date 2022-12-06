import { FC, ReactNode, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children?: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (status === 'authenticated') {
      // TODO: dispatch({ type: '[Auth] - Login', payload: data?.user as IUser})
      
    }
  }, [ status, data ])
  


  // useEffect(() => {
  //   checkToken();
  // }, [])

  const checkToken = async () => {

    if (!Cookies.get('token')) {
        return;
    }

    try {
      const { data } = await tesloApi.get('/user/validate');
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user }); 
    } catch (error) {
      Cookies.remove('token');
    }
  }

  const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return {
        hasError: false,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      };

      return {
        hasError: true,
        message: 'No se puedo crear el usuario - intentelo de nuevo',
      }
    }
  }


  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return true;

    } catch (error) {
      return false;
    }
  }

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zipcode');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');
  
    router.reload();
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};      