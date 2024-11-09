import NextAuth, { AuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/libs/prismadb";
import { DefaultSession } from "next-auth";
import { User } from "@prisma/client";
interface CustomUser extends User {
    classes: string[];
    token: string;
}

// Extend the built-in Session type
declare module "next-auth" {
    interface Session {
        user: CustomUser & DefaultSession["user"];
    }
}

// Extend the built-in JWT type
declare module "next-auth/jwt" {
    interface JWT {
        user: CustomUser;
    }
}

export const authOptions:AuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name : "credentials",
            credentials: {
                token: {label: "token", type:"text", placeholder:"token-here"},
            },
            async authorize(credentials,req) {
                if (!credentials) {
                    console.log("happening")
                    return null;
                }
                if (!credentials.token) {
                    console.log("happening")
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        token:credentials.token
                    }
                })
                
                return user as CustomUser
            }
        })
    ],
    callbacks: {
        // This callback is called whenever a JSON Web Token is created or updated
        async jwt({ token, user }) {
            // If user exists in this callback, it means this is the initial token creation
            if (user) {
                // Pass all user properties to the token
                token.user = user as CustomUser
            }
            return token
        },
        // This callback is called whenever a session is checked
        async session({ session, token }: {session:any,token:any}) {
            // Pass the user info from the token to the session
            session.user = token.user as any
            return session
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_AUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
}
const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}