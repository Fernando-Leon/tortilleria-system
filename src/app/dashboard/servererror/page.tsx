import Navbar from "@/app/ui/auth/components/navbar"

export default function page() {
    return (
        <div>
            <Navbar />
            <h3 className="text-3xl font-semibold text-center p-12">
            500 - Internal Server Error ⚠️🔥
            </h3>
            <p>
            Es un error genérico cuando el servidor encuentra un problema inesperado y no puede procesar la solicitud. Puede deberse a fallos en el código, problemas en la base de datos o errores en la configuración del servidor.
            </p>
        </div>
    )
}