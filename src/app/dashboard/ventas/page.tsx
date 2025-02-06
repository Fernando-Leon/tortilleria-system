import Navbar from "@/app/ui/auth/components/navbar"

export default function page() {
    return (
        <div>
            <Navbar />
            <div className="p-6 flex gap-2">
                <span>dashboard</span><span>&gt;</span><span>ventas</span>
            </div>
            <h3 className="text-3xl font-semibold text-center p-12">
                Ventas
            </h3>
        </div>
    )
}