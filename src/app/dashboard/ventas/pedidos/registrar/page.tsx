import { LayoutPage } from "@/app/ui/components/LayoutPage"
import RouteGuard from "@/app/lib/actions/auth/RouteGuard";
import ROUTES from "@/app/lib/routes/ROUTESPATH";

export default function page() {
    return (
      <RouteGuard route={ROUTES.VENTAS.REGISTRAR}>
        <LayoutPage>
          <h3>Registrar Pedido</h3>
        </LayoutPage>  
      </RouteGuard>
    )
}