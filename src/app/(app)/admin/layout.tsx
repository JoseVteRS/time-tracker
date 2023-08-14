import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SidebarListItem } from "./sidebar-list-item";

const links = [
  { href: '/admin/profile', label: 'Profile' },
  { href: '/admin/team', label: 'Team' },
  { href: '/admin/billing', label: 'Billing' },
]

const Sidebar = () => {
  return (
    <ul>
      {links.map((link) => (
        <SidebarListItem key={link.href}  {...link} />
      ))}
    </ul>
  )
}


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserSession();
  const projects = await prisma.project.findMany({
    where: {
      tenantId: user?.tenantId,
    },
    orderBy: {
      createdAt: "desc"
    }
  })



  return (
    <div className="container mx-auto flex gap-4 divide-x-2 py-4 h-screen">
      <div className="w-2/12">
        <Sidebar />
      </div>

      <div className="px-4 w-full"> {children}  </div>
    </div>
  );
}