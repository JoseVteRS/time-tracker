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
                    <DropdownMenuItem asChild className="w-full cursor-pointer">
                        <Link className="w-full" href="/admin/profile" >
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="w-full cursor-pointer">
                        <Link className="w-full" href="/admin/team" >
                            Team
                        </Link></DropdownMenuItem>
                    <DropdownMenuItem asChild className="w-full cursor-pointer">
                        <Link className="w-full" href="/admin/billing" >
                            Billing
                        </Link></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Logout />
                </DropdownMenuContent>
            </DropdownMenu>

        </>




    )
}
