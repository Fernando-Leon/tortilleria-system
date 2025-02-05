import Navbar from "@/app/ui/auth/components/navbar"

export default function page() {
    return (
        <div>
            <Navbar />
            <h3 className="text-3xl font-semibold text-center p-12">
                4403 - Forbidden 🚫
            </h3>
            <p>
            Indica que el usuario no tiene permisos para acceder a la página o recurso solicitado, aunque exista en el servidor. Suele estar relacionado con restricciones de autenticación o configuraciones de permisos en el servidor.
            </p>
        </div>
    )
}