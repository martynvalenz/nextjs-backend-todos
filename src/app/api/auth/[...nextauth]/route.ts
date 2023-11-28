import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailAndPassword } from "@/auth/actions/auth.actions";

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Correo electrónico", type: "email", placeholder: "Correo" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailAndPassword(credentials!.email, credentials!.password);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],

  session:{
    strategy: 'jwt',
  },

  callbacks:{
    async signIn({user, profile, email, account,credentials}){
      // console.log(user, profile, email, account, credentials);
      return true;
    },

    async jwt({token/* , user, account, profile */}){
      const dbUser = await prisma.user.findUnique({
        where:{
          email: token.email ?? ''
        }
      });
      if(!dbUser?.isActive){
        throw Error('User is not active');
      }
      token.roles = dbUser?.roles ?? ['no-role'];
      token.id = dbUser?.id ?? 'no-uuid';
      // token.isActive
      return token;
    },
    
    async session({session, token/* , user */}){
      if(session && session.user){
        (session.user).roles = token.roles;
        (session.user).id = token.id;
      }
      return session;
    }
  }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};