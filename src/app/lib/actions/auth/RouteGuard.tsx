'use client';
import { getSession } from "@/app/lib/actions/auth/sessions";
import { getPermissionsByUserId } from "@/app/lib/actions/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react"; // Importa el Spinner

interface RouteGuardProps {
  children: React.ReactNode;
  route: string;
}

export default function RouteGuard({ children, route }: RouteGuardProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null indica que la validación está en progreso
  const router = useRouter();

  useEffect(() => {
    async function checkPermissions() {
      const session = await getSession();
      console.log("Ruta actual:", route); // Muestra la ruta actual
      console.log("Sesión obtenida:", session); // Muestra la sesión completa

      if (!session) {
        setIsAuthorized(false);
        router.replace("/unauthorized");
        return;
      }

      // Obtener permisos del usuario
      const permissions = await getPermissionsByUserId(Number(session.userId));
      console.log("Permisos del usuario:", permissions); // Muestra los permisos del usuario

      // Validar permisos para la ruta base y sus hijos
      const baseRoute = "/dashboard/management/profiles";
      const isChildRoute = route.startsWith(baseRoute);

      const routePermission = permissions.find((p: any) => `/dashboard${p.route}` === baseRoute);
      console.log("Permiso encontrado para la ruta base:", routePermission); // Muestra el permiso encontrado para la ruta base

      if (isChildRoute && !routePermission?.canRead) {
        setIsAuthorized(false);
        router.replace("/unauthorized");
        return;
      }

      if (routePermission?.canRead || !isChildRoute) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        router.replace("/unauthorized");
      }
    }

    checkPermissions();
  }, [route, router]);

  if (isAuthorized === null) {
    // Mostrar un spinner mientras se valida la autorización
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="default" label="Cargando..." labelColor="foreground" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Esto nunca debería mostrarse porque el router ya redirigió
  }

  return <>{children}</>;
}