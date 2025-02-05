import Navbar from "@/app/ui/auth/components/navbar"

export default function page() {
    return (
        <div>
            <Navbar />
            <h3 className="text-3xl font-semibold text-center p-12">
                404 - Not Found 🔍❌
            </h3>
            <p>
            Ocurre cuando el servidor no encuentra la página solicitada. Puede deberse a un enlace roto, un archivo eliminado o una URL mal escrita.
            </p>
        </div>
    )
}