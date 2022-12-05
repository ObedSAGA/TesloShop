import { createContext } from 'react';
import { ShippingAddress } from './';
import { ICartProduct } from '../../interfaces';

interface ContextProps {
     isLoaded: boolean;
     cart: ICartProduct[];
     numberOfItems: number;
     subTotal: number;
     tax: number;
     total: number;

     shippingAddress?: ShippingAddress;

     //Methods
     addProductToCart: (product: ICartProduct) => void;
     updateCartQuantity: (product: ICartProduct) => void;
     removeProductCart: (product: ICartProduct) => void;
     updateAddres: (address: ShippingAddress) => void
     

}

export const CartContext = createContext({} as ContextProps);