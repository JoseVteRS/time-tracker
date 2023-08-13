import { getUserSession } from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import { ProjectList } from "../projects";
import { Button } from "@/components/ui/button";
import Link from "next/link";


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
                <div className="flex items-center justify-between" >
                    <h2 className="text-2xl">Projects List</h2>
                    <Button asChild>
                        <Link href="/projects/new" > Create </Link>
                    </Button>
                </div>
                <ProjectList projects={projects} />
            </div>

            <div className="px-4 w-full"> {children}  </div>
        </div>
    );
}