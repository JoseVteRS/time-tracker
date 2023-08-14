'use client'

import React from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { signOut } from "next-auth/react"

export const Logout = () => (
  <DropdownMenuItem className='cursor-pointer' onClick={() => signOut()} >
    <LogOut className="mr-2 h-4 w-4" />
    <span>Log out</span>
  </DropdownMenuItem>
)

