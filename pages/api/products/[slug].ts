import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = 
|{ message: string }
| IProduct

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProductsbySlug(req, res)
    
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const getProductsbySlug = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { slug } = req.query;

    await db.connect();

    const product = await Product.findOne({slug}).lean();
    await db.disconnect();

    if(!product){
        return res.status(404).json({
            message: 'Not found'
        })
    }

    return res.json(product);
}