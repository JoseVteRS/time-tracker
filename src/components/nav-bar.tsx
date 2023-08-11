import Link from "next/link";
import { getUserSession } from "@/lib/auth";
import { Avatar } from "@/components/avatar";

const links = [
    { href: '/track', label: 'Track' },
    { href: '/clients', label: 'Clients' },
    { href: '/projects', label: 'Projects' },
]

export async function NavBar() {

    const user = await getUserSession();

    return (
        <div className="shadow">
            <div className="container mx-auto flex items-center py-2 space-x-4" >
                <Link href="/" className="py-1 px-2 hover:bg-slate-100 rounded transition-all">
                    <span className="font-semibold">Time Tracker</span>
                </Link>
                <nav>
                    <ul className="flex items-center gap-2">
                        {
                            links.map(({ href, label }) => (
                                <li key={href} className="py-1 px-2 hover:bg-slate-100 text-sky-600 hover:text-sky-800 transition" >
                                    <Link href={href}>
                                        {label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <span className="flex-grow" />

                <Avatar user={user} />

            </div>
        </div>
    )
}