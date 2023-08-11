import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function EditProjectPage({ params }: { params: { id: string } }) {

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

    const createProject = async (data: FormData) => {
        'use server'
        const user = await getUserSession()
        const project = await prisma.project.create({
            data: {
                tenantId: user.tenant.id,
                name: data.get('name') as string,
                color: data.get('color') as string,
            }
        })
    }

    return (
        <div>
            <h1>Edit Project</h1>
            <form action={createProject} className="max-w-3xl mx-auto pt-4 flex flex-col gap-4">

                <div className="grid w-full max-w-sm items-center gap-1.5" >
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" name="name" placeholder="Project name" className="w-full" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5" >
                    <Label htmlFor="name">Color</Label>
                    <Input type="color" name="color" placeholder="Project Color" className="w-full" />
                </div>
                <div>
                    <Button type="submit" className="mt-5" >Create project</Button>
                </div>

            </form>
        </div>
    );
}