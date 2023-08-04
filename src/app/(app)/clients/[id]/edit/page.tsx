import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ClientEditPage({ params }: ClientDetailProps) {
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

  return (
      <div className="mx-auto container py-4">
          <div className="flex justify-between w-full items-center">
              <h2 className="text-lg font-medium mb-2" >Edit client</h2>
              
          </div>
          <h3>{client.name}</h3>
      </div>
  );
}