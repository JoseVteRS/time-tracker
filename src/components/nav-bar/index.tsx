import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getServerSession } from "next-auth";
import { getUserSession } from "@/lib/auth";

const links = [
    { href: '/track', label: 'Track' },
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
                    <ul>
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

                <Avatar>
                    <AvatarImage src={user.image} referrerPolicy="no-referrer" />
                    <AvatarFallback>{ user.name.split('')[0] }</AvatarFallback>
                </Avatar>

            </div>
        </div>
    )
}