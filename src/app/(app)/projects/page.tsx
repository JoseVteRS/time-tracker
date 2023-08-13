import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";


const Blankslate = () => {
    return (
        <div className="rounded-lg bg-slate-200 flex flex-col items-center gap-4 p-4">
            <h2 className="text-lg font-semibold">Create a Project</h2>
            <p>
                A project represents work you are doing for a client. A client often will have mult8iple
                projects you can track time for each project.

            </p>
            <Button asChild>
                <Link href="/projects/new" > Create </Link>
            </Button>

        </div>
    )
}


export default async function ProjectsPage() {
    const user = await getUserSession();
    const projects = await prisma.project.findMany({
        where: {
            tenantId: user.tenant.id,
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    if (projects.length > 0) {
        redirect(`/projects/${projects[0].id}`)
    }


    return (
        <div className="mx-auto container py-4">
            {<Blankslate />}
        </div>
    );
}