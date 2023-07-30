import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {

            if (!profile?.email) throw new Error('No profile')

            const user = await prisma.user.upsert({
                where: {
                    email: profile.email
                },
                create: {
                    email: profile.email,
                    name: profile.name,
                    avatar: (profile as any).picture,
                    tenant: {
                        create: {
                            name: profile.name,
                        }
                    }
                },
                update: {
                    name: profile.name,
                    avatar: (profile as any).picture,
                }
            })

            return true;
        },
    }
}



const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }