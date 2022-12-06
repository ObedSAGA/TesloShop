import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: {
          label: "Correo electrónico",
          type: "email",
        },
        password: { label: "Contraseña", type: "password",},
      },
      async authorize(credentials, req) {
        console.log({ credentials });

        return { name: 'Juan', correo: 'juan@correo.com', role: 'admin'};
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // ...add more providers here


  ],

  // Callbacks
  jwt: {

  },

  callbacks: {

     async jwt({ token, account, user }){

      console.log({ token, account, user });

      return token;
    },

    async session({ session, token, user }){

      console.log({ session, token, user });
      

      return session;
    }
  }
};

export default NextAuth(authOptions);
