import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';
import fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' )

type Data = { message: string }

export const config = {
    api: {
        bodyParser: false,
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return uploadFile( req, res );
    
        default:
             return  res.status(400).json({ message: 'Bad request' });
    }
    
    
    
}


const saveFile = async( file: formidable.File ): Promise<string> => {

    // ESTE CODIGO ES PARA SUBIR LOS ARCHIVOS AL FILES SYSTEM, PERO NO ES RECOMENDADO!
    // const data = fs.readFileSync( file.filepath )
    // fs.writeFileSync(`./public/${ file.originalFilename }`, data);
    // fs.unlinkSync( file.filepath );// elimina el archivo temporal
    // return;

    const { secure_url } = await cloudinary.uploader.upload( file.filepath )
    return secure_url;

}

const parseFiles = (req: NextApiRequest): Promise<string> => {

    return new Promise( (resolve, reject) => {

        const form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files) => {
            // console.log({ err, fields, files });

            if ( err ) {
                return reject(err);
            }

            const filePath = await saveFile( files.file as formidable.File );
            resolve(filePath);
        });
    })

}

const uploadFile = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const imageURL = await parseFiles( req );

    return res.status(200).json({ message: imageURL })


}
