'use client'    
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl">Sistema de la tortillería</h2>
                
                {/* Icono de hamburguesa */}
                <button 
                    className="block md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="2" 
                        stroke="currentColor" 
                        className="w-8 h-8"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                
                {/* Menú en pantallas grandes */}
                <ul className="hidden md:flex gap-4">
                    <li><Link href="/dashboard">Inicio</Link></li>
                    <li><Link href="/dashboard/ventas">Ventas</Link></li>
                    <li><Link href="/dashboard/clientes">Clientes</Link></li>
                    <li><Link href="/dashboard/configuracion">Configuración</Link></li>
                </ul>
            </div>

            {/* Menú desplegable en móviles */}
            {isOpen && (
                <ul className="flex flex-col gap-3 mt-4 md:hidden">
                    <li><Link href="/dashboard">Inicio</Link></li>
                    <li><Link href="/dashboard/ventas">Ventas</Link></li>
                    <li><Link href="/dashboard/clientes">Clientes</Link></li>
                    <li><Link href="/dashboard/configuracion">Configuración</Link></li>
                </ul>
            )}
        </nav>
    );
}
