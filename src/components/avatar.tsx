'use client'

import { Session } from "next-auth"
import { AvatarFallback, AvatarImage, Avatar as RootAvatar } from "./ui/avatar"



import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { Logout } from "./logout"

export const Avatar = ({ user }: { user: Session['user'] }) => {
    return (


        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>

                    <RootAvatar>
                        {user.image && <AvatarImage src={user.image} referrerPolicy="no-referrer" />}
                        {!user.image && <AvatarFallback>{user.name ? user.name.split('')[0] : ''}</AvatarFallback>}
                    </RootAvatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link className="w-full" href="/profile" >
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Logout />
                </DropdownMenuContent>
            </DropdownMenu>

        </>




    )
}
