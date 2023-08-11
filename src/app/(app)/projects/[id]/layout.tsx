import { getUserSession } from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import { ProjectList } from "../projects";


export default async function ProjectLayout({ children }: { children: React.ReactNode }) {
    const user = await getUserSession();
    const projects = await prisma.project.findMany({
        where: {
            tenantId: user?.tenantId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="container mx-auto flex gap-4 divide-x-2 py-4 h-screen">
            <div className="w-1/2">
                <ProjectList projects={projects} />
            </div>

            <div className="px-4 w-full"> {children}  </div>
        </div>
    );
}