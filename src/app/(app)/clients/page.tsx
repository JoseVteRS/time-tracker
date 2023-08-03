import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ClientList } from "./client-list";



const Blankslate = () => {
    return (
        <div className="rounded-lg bg-slate-200 flex flex-col items-center gap-4 p-4">
            <h2 className="text-lg font-semibold">Create a Client</h2>
            <p>
                A client represents an entity that you are doing work for.
                Client often have many projects you do for them. Create a client to keep your work organized.
            </p>
            <Button asChild>
                <Link href="/clients/new" > Create </Link>
            </Button>
            {/* <Button variant="">Create</Button> */}
        </div>
    )
}




export default async function ClientPage() {
    const user = await getUserSession();
    const clients = await prisma.client.findMany({
        where: {
            tenantId: user?.tenantId,
        }
    })

    return (
        <div className="mx-auto container py-4">
            <h2 className="text-lg font-medium mb-2">Clients</h2>
            {clients.length > 0 ? <ClientList clients={clients} /> : <Blankslate />}
        </div>
    );
}