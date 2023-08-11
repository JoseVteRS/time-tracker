import { getUserSession } from "@/lib/auth";
import { ClientList, ClientListHeader } from "../clients";
import { prisma } from "@/lib/prisma";


export default async function ClientLayout({ children }: { children: React.ReactNode }) {

    const user = await getUserSession();

    const clients = await prisma.client.findMany({
        where: {
            tenantId: user?.tenantId,
        }
    })

    return (
        <div className="container mx-auto flex gap-4 divide-x-2 py-4 h-screen">
            <div className="w-1/2">
                <ClientListHeader />
                <ClientList clients={clients} />
            </div>

            <div className="px-4 w-full"> {children}  </div>
        </div>
    );
}