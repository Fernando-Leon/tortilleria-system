import { LayoutPage } from "@/app/ui/components/LayoutPage";
import PermissionsTable from "@/app/ui/permissions/permissions-table";
import RouteGuard from "@/app/lib/actions/auth/RouteGuard";
import ROUTES from "@/app/lib/routes/ROUTESPATH";

export default function Page() {
  return (
    <RouteGuard route={ROUTES.MANAGEMENT.PERMISSIONS}>
      <LayoutPage>
        <PermissionsTable />
      </LayoutPage>
    </RouteGuard>
  );
}