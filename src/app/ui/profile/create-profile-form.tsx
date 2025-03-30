'use client'

import React, { useEffect } from "react";
import { useActionState } from "react";
import { submitNewProfile } from "@/app/lib/actions/profile/profile";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";
import type { ActionResponseProfile } from "@/app/types/profile";
import Link from "next/link";
import ROUTES from "@/app/lib/routes/ROUTESPATH";

const initialState: ActionResponseProfile = {
  success: false,
  message: "",
};

export default function NewProfileForm() {
  const [state, action, isPending] = useActionState(
    submitNewProfile,
    initialState
  );
  const router = useRouter();


  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(ROUTES.MANAGEMENT.PROFILES);
    }
  }, [state.success, state.message, router]);

  return (
    <Card className="p-4 w-1/2">
    <CardHeader className="flex gap-3">
      <h2 className="text-2xl font-semibold text-center">Agregar perfil</h2>
    </CardHeader>
    <CardBody>
      <form
        action={action}
        className="flex flex-col gap-4 w-full"
        autoComplete="on"
      >
        <div className="space-y-2">
          <label htmlFor="name">Nombre</label>
          <Input
            id="name"
            name="name"
            placeholder="Administrador"
            minLength={2}
            maxLength={20}
            aria-describedby="name-error"
            variant="bordered"
            required
            className={state?.errors?.name ? "border-red-500" : ""}
          />
          {state?.errors?.name && (
            <p id="name-error" className="text-sm text-red-500">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="description">Descripcion</label>
          <Input
            id="description"
            name="description"
            variant="bordered"
            type="description"
            placeholder="tu_contraseña" 
            minLength={2}
            maxLength={20}
            required
            aria-describedby="description-error"
            className={state?.errors?.description ? "border-red-500" : ""}
          />
          {state?.errors?.description && (
            <p id="name-error" className="text-sm text-red-500">
              {state.errors.description[0]}
            </p>
          )}
        </div>
        <div className="flex flex-row-reverse w-full justify-between items-center gap-4">
          <Button
            type="submit"
            color="primary"
            className="mt-4 w-1/2"
            isLoading={isPending}
          >
            {isPending ? "Creando..." : "Crear"}
          </Button>
          <Button
            color="primary"
            variant="bordered"
            as={Link}
            href={ROUTES.MANAGEMENT.PROFILES}
            className="mt-4 w-1/2"
          >
            Regresar
          </Button>
        </div>
      </form>
    </CardBody>
  </Card>
  )
}