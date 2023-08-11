import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default async function NewProjectPage() {

    async function createProject(data: FormData) {
        'use server'
        const user = await getUserSession()
        const project = await prisma.project.create({
            data: {
                tenantId: user.tenant.id,
                name: data.get('name') as string,
                color: data.get('color') as string,
            }
        })

        revalidatePath(`/projects`)
        redirect(`/projects/${project.id}`)

    }

    return (
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
    )
}