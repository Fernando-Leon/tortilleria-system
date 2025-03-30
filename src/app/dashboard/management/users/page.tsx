import UserTable from "@/app/ui/users/user-table"
import { LayoutPage } from "@/app/ui/components/LayoutPage"
import RouteGuard from "@/app/lib/actions/auth/RouteGuard";
import ROUTES from "@/app/lib/routes/ROUTESPATH";

export default function page() {
    return (
      <RouteGuard route={ROUTES.MANAGEMENT.USERS}>
        <LayoutPage>
          <UserTable />
        </LayoutPage>  
      </RouteGuard>
    )
}