import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type ClientDetailProps = {
    params: {
        id: string
    }
}

export default async function ClientPage({ params }: ClientDetailProps) {
    const user = await getUserSession();
    const client = await prisma.client.findFirst({
        where: {
            tenantId: user.tenant.id,
            id: params.id
        }
    })


    if (!client) {
        return <div>Client not found</div>
    }

    return (
        <div className="mx-auto container py-4">
            <h2 className="text-lg font-medium mb-2" >Client</h2>
            <h3>{client.name}</h3>
        </div>
    );
}