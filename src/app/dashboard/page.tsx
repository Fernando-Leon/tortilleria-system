import Link from "next/link"
import Navbar from "@/app/ui/components/navbar"
export default function page() {
    return (
        <div>
            <Navbar />
            <h3 className="text-3xl font-semibold text-center p-12">
                Bienenido al sistema.
            </h3>
            <div className="p-6 flex gap-2">
                <span>dashboard</span>
            </div>
            <div className="flex justify-center P-12 flex-col p-12">
                <h2>Paginas de errores</h2>
                <ul className="flex flex-col">
                    <Link href='/dashboard/notfound'>404 - Not Found 🔍❌</Link>
                    <Link href='/dashboard/forbiden'>403 - Forbidden 🚫</Link>
                    <Link href='/dashboard/servererror'>500 - Internal Server Error ⚠️🔥</Link>
                </ul>
            </div>
        </div>
    )
}