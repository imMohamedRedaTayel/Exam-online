import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions : NextAuthOptions  = {


  session: {
    strategy: 'jwt'
  },

  providers: [

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {

        const { email, password } = credentials;
        // console.log(credentials, 'credentials');

        try {
          const { data } = await axios.post(
            `https://exam.elevateegy.com/api/v1/auth/signin`,
            { email, password }
          );
          console.log(data, 'data is here');
          if (data?.user?.email == email) {
            return data
          }
          // Return the user data and token separately
          return null
        } catch (err: any) {
          console.error("Authorization error:", err);
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRECT as string
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }), 

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string ,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string ,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string
    }),

  ],

  callbacks: {
    // Handle the JWT token and user data
    async jwt({ token, user }) {
      console.log('all user data' , user );
      return { ...token , ...user };
    },
    // Pass the JWT token data to the session object
    async session({ session, token }) {
      console.log('all user session' , session );
      return { ...session , ...token };
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
  },

  secret: process.env.AUTH_SECRET,


};
