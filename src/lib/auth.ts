import { Session, getServerSession } from "next-auth"
import { JWT } from "next-auth/jwt"



type SessionParams = {
    session: Session
    token: JWT
}


export const session = async ({ session, token }: any) => {
    // console.log('Server Sesison', { session, token });

    session.user.id = token.id
    session.user.tenant = token.tenant

    return session

}


export const getUserSession = async () => {
    const authUserSession = await getServerSession({
        callbacks: {
            session
        }
    })
    if (!authUserSession) throw new Error("No session found")
    return authUserSession.user
}