'use client'

import { Session } from "next-auth"
import { AvatarFallback, AvatarImage, Avatar as RootAvatar } from "./ui/avatar"

export const Avatar = ({ user }: { user: Session['user'] }) => {
    return (

        <RootAvatar>
            {user.image && <AvatarImage src={user.image} referrerPolicy="no-referrer" />}
            {!user.image && <AvatarFallback>{user.name ? user.name.split('')[0] : ''}</AvatarFallback>}
        </RootAvatar>

    )
}
