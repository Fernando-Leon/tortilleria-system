'use client';
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { HomeIcon } from "@/app/ui/svg/icons"
 
export default function UnauthorizedPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">No autorizado</h1>
      <p className="mt-4 text-lg">Tu no tienes permisos para acceder a esta pagina</p>
      <Button className="mt-4" onClick={handleGoBack} startContent={<HomeIcon className="w-4 h-4 mr-2" />} color="primary">
        Regresar al Dashboard
      </Button>
    </div>
  );
}