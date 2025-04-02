import { getSession } from "@/app/lib/actions/auth/sessions"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    // Redirige a la página de inicio de sesión si no hay sesión
    redirect("/")
  }

  return (
    <div>
      <h3 className="text-3xl font-semibold text-center p-12">
        Bienvenido al sistema.
      </h3>
    </div>
  )
}