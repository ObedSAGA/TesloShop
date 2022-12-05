import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';


export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;
};

export interface ShippingAddress {
  firstName   : string;
  lastName    : string;
  address     : string;
  address2?   : string;
  zipcode     : string;
  city        : string;
  country     : string;
  phone       : string;
};

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,

  shippingAddress: undefined,
};

interface Props {
  children?: ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
      dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts })

    } catch (error) {
      dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] })
    }
  }, [])

  useEffect(() => {

    if ( Cookie.get('firstName')) {
        const shippingAddress = {
        firstName : Cookie.get('firstName') || '',
        lastName  : Cookie.get('lastName') || '',
        address   : Cookie.get('address') || '',
        address2  : Cookie.get('address2') || '',
        zipcode   : Cookie.get('zipcode') || '',
        city      : Cookie.get('city') || '',
        country   : Cookie.get('country') || '',
        phone     : Cookie.get('phone') || '',
      }
      dispatch({ type: '[Cart] - LoadAdress from cookies', payload: shippingAddress})
    }


  }, [])
  



  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);


  useEffect(() => {
    
    const numberOfItems = state.cart.reduce( ( prev, current) => current.quantity + prev , 0);
    const subTotal = state.cart.reduce( ( prev, current) => current.price * current.quantity + prev  , 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    
    const orderSummary = {
      numberOfItems,
      subTotal, 
      tax: subTotal * taxRate,
      total: subTotal * ( taxRate + 1),
    }

    dispatch({ type: '[Cart] - Update order summary', payload: orderSummary})
    
  }, [state.cart])
  



  const addProductToCart = (product: ICartProduct) => {

    const productInCart = state.cart.some(p => p._id === product._id);
    if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });

    const productInCartButDiffentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
    if (!productInCartButDiffentSize) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });

    // Acumular productos
    const updatedProducts = state.cart.map(p => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
  }


  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Change products cart quantity', payload: product})
  }

  const removeProductCart = ( product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product})
  }

  const updateAddres = ( address: ShippingAddress) => {
    Cookie.set('firstName', address.firstName)
    Cookie.set('lastName', address.lastName)
    Cookie.set('address', address.address)
    Cookie.set('address2', address.address2 || '')
    Cookie.set('zipcode', address.zipcode)
    Cookie.set('city', address.city)
    Cookie.set('country', address.country)    
    Cookie.set('phone', address.phone)


    dispatch({ type: '[Cart] - Update Address', payload: address})
  }


  return (
    <CartContext.Provider 
      value={{
      ...state,

      //Methods
      addProductToCart,
      removeProductCart, 
      updateCartQuantity,
      updateAddres
    }}
    >
      {children}
    </CartContext.Provider>
  );
};