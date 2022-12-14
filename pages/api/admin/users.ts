import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

type Data = 
|{ message: string }
|IUser[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    
    switch ( req.method ) {
        case 'GET':
            return getUser(req, res);
    
        case 'PUT':
            return updateUser(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request' })
    }
    
    
    
    res.status(200).json({ message: 'Example' })
}

const getUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();
    const users = await User.find().select('-password').lean();
    await db.disconnect();

    return res.status(200).json( users );

}
const updateUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { userID = '', role = ''} = req.body; 

    if ( !isValidObjectId( userID )) {
        return res.status(400).json({ message: 'User id is not valid' });
    };

    const validRoles = ['admin', 'manager', 'client'];

    if ( !validRoles.includes(role)) {
        return res.status(400).json({ message: 'Role not permitted' + validRoles.join(', ') });
    };

    await db.connect();

    const user = await User.findById( userID );

    if (!user) {
        await db.disconnect();
        return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();
    await db.disconnect();


    return res.status(200).json({ message: 'User successfully updated'})
}

