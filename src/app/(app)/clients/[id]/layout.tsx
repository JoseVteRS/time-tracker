import { getUserSession } from "@/lib/auth";
import { ClientList } from "../client-list";
import { prisma } from "@/lib/prisma";




export default async function ClientLayout({ children }: { children: React.ReactNode }) {

    const user = await getUserSession();

    const clients = await prisma.client.findMany({
        where: {
            tenantId: user?.tenantId,
        }
    })

    return (
        <div className="container mx-auto flex gap-4 divide-x-4-">
            <div className="w-1/2">
                <ClientList clients={clients} />
            </div>

            <div> {children}  </div>
        </div>
    );
}