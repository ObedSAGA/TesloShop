import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
    numberOfOrders: number;
    paidOrders: number;
    notPaidOrders: number;
    numberOfClients: number; // Con rol "Client"
    numberOfProducts: number;
    productsWithNoStock: number;
    productsWithLowStock: number;  //Productos con 10 o menos en Stock
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    await db.connect();

    const [
        
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoStock,
        productsWithLowStock,

    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client'}).count(),
        Product.count(),
        Product.find({ inStock: 0}).count(),
        Product.find({ inStock: { $lte: 10 }}).count(),
    ])

    await db.disconnect();
    
    res.status(200).json({ 
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoStock,
        productsWithLowStock,
        notPaidOrders: numberOfOrders - paidOrders,

    })


}