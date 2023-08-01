import { getServerSession } from "next-auth"

export type AuthUser = {
    name: string
    email: string
    image: string
}

export const getUserSession = async (): Promise<AuthUser> => {
    const session = await getServerSession()
    if (!session) throw new Error("No session found")
    return session.user as AuthUser
}