import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt'

export async function middleware ( req: NextRequest, ev: NextFetchEvent) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    if ( !session ) {   
        return new Response( JSON.stringify({ message: "Not autorized" }), { 
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        } );
    }

    const validRoles = ['admin', 'manager'];

    if ( !validRoles.includes( session.user.role )) {
        return new Response( JSON.stringify({ message: "Not autorized" }), { 
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        } );
    }


    return NextResponse.next();
}