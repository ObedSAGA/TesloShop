import jwt from 'jsonwebtoken';


export const singToken = ( _id: string, email: string ) => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('There is no JWT Seed declared in ENV - Check enviroment variables')
    }

    return jwt.sign(
        //Payload
        { _id, email },

        //Seed
        process.env.JWT_SECRET_SEED,

        //Options
        { expiresIn: '5d'}
    )
}