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

export const isValidToken = ( token: string ):Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('There is no JWT Seed declared in ENV - Check enviroment variables')
    }

    return new Promise( ( resolve, reject ) => {

        try {
            jwt.verify( token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) return reject('JWT is not valid')
                const { _id } = payload as { _id: string }

                resolve(_id);
            })
        } catch (error) {
            reject('JWT is not valid')
        }
    })
}