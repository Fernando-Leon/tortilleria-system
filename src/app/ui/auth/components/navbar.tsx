import Link from "next/link"

export default function Navbar() {
    return (
        <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
            <h2 className="text-3xl">Sistema de la tortilleria</h2>
            <li className="flex gap-2 items-center">
                <Link href="/dashboard">Inicio</Link>
                <Link href="/dashboard/ventas">Ventas</Link>
                <Link href="/dashboard/clientes">Clientes</Link>
                <Link href='/dashboard/configuracion'>Configuracion</Link>
            </li>
        </div>
    )
}