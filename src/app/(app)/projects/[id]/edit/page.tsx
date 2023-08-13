import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export default async function EditProjectPage({ params }: { params: { id: string } }) {

    const user = await getUserSession()
    const clients = (
        await prisma.client.findMany({
            where: {
                tenantId: user.tenant.id
            }
        })
    ).map((client) => ({
        value: client.id,
        label: client.name
    }))

    const project = await prisma.project.findUnique({
        where: {
            tenantId: user.tenant.id,
            id: params.id
        },
        include: {
            client: true,
        }
    })

    const editProject = async (data: FormData) => {
        'use server'

        const client = data.get('client') as string


        await prisma.project.update({
            where: {
                tenantId: user.tenant.id,
                id: params.id
            },
            data: {
                tenantId: user.tenant.id,
                name: data.get('name') as string,
                color: data.get('color') as string,
                clientId: client ? client : undefined
            }
        })

        revalidatePath(`/projects/${params.id}`)
        redirect(`/projects/${params.id}`)
    }

    if (!project) notFound()


    return (
        <div>
            <h1>Edit Project</h1>
            <form action={editProject} className="pt-4 flex flex-col gap-4">

                <div className="grid w-full max-w-sm items-center gap-1.5" >
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" name="name" defaultValue={project.name} placeholder="Project name" className="w-full" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5" >
                    <Label htmlFor="name">Color</Label>
                    <Input type="color" name="color" defaultValue={project.color || ''} placeholder="Project Color" className="w-full" />
                </div>

                <div>
                    <Label htmlFor="email">Client</Label>
                    <Select name="client" defaultValue={project.clientId || ''} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Assign a Client" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Client</SelectLabel>
                                <SelectItem value="">None</SelectItem>
                                {clients.map((client) => (
                                    <SelectItem value={client.value} key={client.value} >
                                        {client.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Button type="submit" className="mt-5" >Edit</Button>
                </div>

            </form>
        </div>
    );
}