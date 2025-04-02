import RouteGuard from "@/app/lib/actions/auth/RouteGuard";
import ROUTES from "@/app/lib/routes/ROUTESPATH";

export default function ProfilesLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard route={ROUTES.MANAGEMENT.PROFILES}>
      {children}
    </RouteGuard>
  );
}