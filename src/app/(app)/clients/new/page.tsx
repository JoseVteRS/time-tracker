import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function NewClientPage() {
    const user = await getUserSession();

    async function onCreate(data: FormData) {
        'use server'

        await prisma.client.create({
            data: {
                tenantId: user.tenant.id,
                name: data.get('name') as string,
                color: data.get('color') as string,
            }
        })

        redirect('/clients')
    }


    return (
        <div className="mx-auto container py-4">
            <h2 className="text-lg font-medium mb-2">Create a new client</h2>

            <form action={onCreate} className="flex gap-4">
                <Input type="color" name="color" placeholder="Color" className="w-12" />
                <Input type="text" name="name" placeholder="Client name" className="w-full" />
                <Button type="submit">Create</Button>
            </form>
        </div>
    );
}