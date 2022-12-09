import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";
 
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [

    CredentialsProvider({ 
      name: 'Email',
      credentials: {
        email: { label: 'Correo electrónico:', type: 'email' },
        password: { label: 'Contraseña:', type: 'password' },
      },
      async authorize(credentials) {


        return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password)
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // ...add more providers here
  ],


  // Custom pages

  pages: { 
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  session: {
    maxAge: 2592000, // Every 30 days
    strategy: 'jwt',
    updateAge: 86400, // Every day
  },

  // Callbacks
    callbacks: { 

      async jwt({ token, account, user}) {


        if ( account ) {
          token.accessToken = account.access_token;

          switch ( account.type ) {
            case 'oauth':
              token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '');
              break;

            case 'credentials':
              token.user = user;
              break;
          
          }
        }

        
        return token;
      },

      async session({ session, token, user }) {

        session.accessToken = token.accessToken as string;
        session.user = token.user as any;
        

        return session;
      }

    }

}
export default NextAuth(authOptions);