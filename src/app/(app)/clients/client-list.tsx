import { Client } from "@prisma/client";
import Link from "next/link";


type ClientListPros = {
    clients: Client[];
}

export const ClientList = ({ clients }: ClientListPros) => {
    return (
        <ul>
            {
                clients.map(client => {
                    return (

                        <li key={client.id}>
                            <Link href={`clients/${client.id}`} >
                                {client.name}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )

}
