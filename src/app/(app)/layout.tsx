import { NavBar } from "@/components/nav-bar";

export default function AppLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
}