'use client';

import React, { useState } from "react";
import { useActionState } from "react";
import { getCatalogStatus, getCatalogPofiles } from "@/app/lib/actions/catalogs/catalogs";
import { submitNewUser } from "@/app/lib/actions/users/user";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  Select,
  SelectItem,
} from "@heroui/react";
import type { ActionResponse } from "@/app/types/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import ROUTES from "@/app/lib/routes/ROUTESPATH";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export default function NewUserForm() {
  const [state, action, isPending] = useActionState(
    submitNewUser,
    initialState
  );
  const [statusOptions, setStatusOptions] = useState<{ id: number; name: string }[]>(
    []
  );
  const [profilesOptions, setProfilesOptions] = useState<{ id: number; name: string }[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    async function fetchStatusOptions() {
      const status = await getCatalogStatus();
      const profiles = await getCatalogPofiles();
      setProfilesOptions(profiles);
      setStatusOptions(status);
    }
    fetchStatusOptions();
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(ROUTES.VENTAS.USERS);
    }
  }, [state.success, state.message, router]);

  return (
    <Card className="p-4 w-1/2">
      <CardHeader className="flex gap-3">
        <h2 className="text-2xl font-semibold text-center">Agregar usuario</h2>
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
              placeholder="Fernando"
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
            <label htmlFor="password">Contraseña</label>
            <Input
              id="password"
              name="password"
              variant="bordered"
              type="password"
              placeholder="tu_contraseña" 
              minLength={2}
              maxLength={20}
              required
              aria-describedby="password-error"
              className={state?.errors?.password ? "border-red-500" : ""}
            />
            {state?.errors?.password && (
              <p id="name-error" className="text-sm text-red-500">
                {state.errors.password[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="profileId">Perfil</label>
            <Select
              id="profileId"
              name="profileId"
              variant="bordered"
              placeholder="Selecciona un perfil"
              aria-describedby="profile-error"
              isRequired
              className={state?.errors?.profileId ? "border-red-500" : ""}
            >
              {profilesOptions.map((profile) => (
                <SelectItem key={profile.id} value={profile.id}>
                  {profile.name}
                </SelectItem>
              ))}
            </Select>
            {state?.errors?.profileId && (
              <p id="profileId-error" className="text-sm text-red-500">
                {state.errors.profileId[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="statusId">Estado</label>
            <Select
              id="statusId"
              name="statusId"
              variant="bordered"
              placeholder="Selecciona un estado"
              aria-describedby="status-error"
              isRequired
              className={state?.errors?.statusId ? "border-red-500" : ""}
            >
              {statusOptions.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.name}
                </SelectItem>
              ))}
            </Select>
            {state?.errors?.statusId && (
              <p id="statusId-error" className="text-sm text-red-500">
                {state.errors.statusId[0]}
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
              href={ROUTES.VENTAS.USERS}
              className="mt-4 w-1/2"
            >
              Regresar
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
