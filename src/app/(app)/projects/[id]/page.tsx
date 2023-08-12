import Link from 'next/link'
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button'
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MoreHorizontal } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";



const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


type Params = {
    params: { id: string; }
};

export default async function ProjectDetailPage({ params }: Params) {


    const user = await getUserSession()
    const project = await prisma.project.findUnique({
        where: {
            tenantId: user.tenant.id,
            id: params.id
        },
        include: {
            client: true,
        }
    })


    async function deleteProject() {
        'use server'
        if (!project) notFound()

        await prisma.project.deleteMany({
            where: {
                tenantId: user.tenant.id,
                id: params.id
            }
        })

        revalidatePath('/projects')
        redirect('/projects')
    }


    if (!project) notFound()

    // await sleep(1500);

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1>Project details</h1>
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>


                            <DropdownMenuItem>
                                <Link href={`/projects/${project.id}/edit`}>
                                    Edit
                                </Link>
                            </DropdownMenuItem>


                            <DialogTrigger asChild >
                                <DropdownMenuItem className="text-red-500" >Delete</DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>

                        <DialogContent>
                            <DialogHeader>Do you want to delete this project?</DialogHeader>
                            <DialogDescription>
                                This action cannot be undone. Are you sure you want to permanently delete this project?
                            </DialogDescription>

                            <DialogFooter>
                                <form action={deleteProject}>
                                    <Button type="submit" variant="destructive">Delete</Button>
                                </form>
                            </DialogFooter>

                        </DialogContent>
                    </DropdownMenu>

                </Dialog>
            </div>
            <div>{project.name}</div>

            {project.client && (
                <div>
                    <h2>Client</h2>
                    <div>{project.client.name}</div>
                </div>
            )}

        </div>
    );
} 