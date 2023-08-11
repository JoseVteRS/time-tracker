import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
        return redirect('/clients')
    }


    async function deleteClient() {
        'use server'
        if (!client) return redirect('/clients')

        console.log('delete client')

        await prisma.client.deleteMany({
            where: {
                tenantId: user.tenant.id,
                id: client.id
            }
        })

        redirect('/clients')
    }

    return (
        <div className="mx-auto container py-4">
            <div className="flex justify-between w-full items-center">
                <h2 className="text-lg font-medium mb-2" >client</h2>

                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link href={`/clients/${client.id}/edit`}>
                                    Edit
                                </Link>
                            </DropdownMenuItem>


                            <DialogTrigger asChild >
                                <DropdownMenuItem className="text-red-500" >Delete</DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>

                        <DialogContent>
                            <DialogHeader>Do you want to delete this client?</DialogHeader>
                            <DialogDescription>
                                This action cannot be undone. Are you sure you want to permanently delete this client?
                            </DialogDescription>

                            <DialogFooter>
                                <form action={deleteClient}>
                                    <Button type="submit" variant="destructive">Delete</Button>
                                </form>
                            </DialogFooter>

                        </DialogContent>
                    </DropdownMenu>

                </Dialog>


            </div>
            <h3>{client.name}</h3>
        </div >
    );
}