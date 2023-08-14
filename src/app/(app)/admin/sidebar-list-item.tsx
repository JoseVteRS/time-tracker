'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  href: string
  label: string
}

export const SidebarListItem = ({ href, label }: Props) => {

  const pathname = usePathname()
  
  return (
    <li key={`${href}`} className={cn('rounded-md hover:bg-neutral-100/70', {
      'bg-neutral-100/70': pathname === href
    })}>
      <Link className="block w-full p-2" href={href}>{label}  </Link>
    </li>
  )
}
