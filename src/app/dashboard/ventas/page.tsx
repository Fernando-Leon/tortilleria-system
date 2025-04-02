import { LayoutPage } from "@/app/ui/components/LayoutPage"
import RouteGuard from "@/app/lib/actions/auth/RouteGuard";
import ROUTES from "@/app/lib/routes/ROUTESPATH";

export default function page() {
    return (
      <RouteGuard route={ROUTES.VENTAS.VENTAS}>
        <LayoutPage>
          <h3>Ventas</h3>
        </LayoutPage>  
      </RouteGuard>
    )
}