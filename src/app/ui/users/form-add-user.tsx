'use client';

import React, { useState } from "react";
import { useActionState } from "react";
import { getCatalogSex } from "@/app/lib/actions/catalogs/catalogs";
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

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export default function NewUserForm() {
  const [state, action, isPending] = useActionState(
    submitNewUser,
    initialState
  );
  const [sexOptions, setSexOptions] = useState<{ id: number; name: string }[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    async function fetchSexOptions() {
      const options = await getCatalogSex();
      setSexOptions(options);
    }
    fetchSexOptions();
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/dashboard/users");
    }
  }, [state.success, state.message, router]);

  return (
    <Card className="p-4 w-1/2">
      <CardHeader className="flex gap-3">
        <h2 className="text-lg font-semibold text-center">Agregar usuario</h2>
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
              required
              size="sm"
              className={state?.errors?.name ? "border-red-500" : ""}
            />
            {state?.errors?.name && (
              <p id="name-error" className="text-sm text-red-500">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="lastname">Apellido</label>
            <Input
              id="lastname"
              name="lastname"
              placeholder="Leon"
              minLength={2}
              maxLength={20}
              size="sm"
              aria-describedby="lastname-error"
              required
            />
            {state?.errors?.lastname && (
              <p id="name-error" className="text-sm text-red-500">
                {state.errors.lastname[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="mail">Correo electronico</label>
            <Input
              id="mail"
              name="mail"
              placeholder="correo@correo.com"
              type="email"
              required
              size="sm"
              minLength={2}
              maxLength={50}
              aria-describedby="mail-error"
              className={state?.errors?.mail ? "border-red-500" : ""}
            />
            {state?.errors?.mail && (
              <p id="mail-error" className="text-sm text-red-500">
                {state.errors.mail[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="sexId">Sexo</label>
            <Select
              placeholder="Selecciona un sexo"
              size="sm"
              id="sexId"
              name="sexId"
              isRequired
              className={state?.errors?.sexId ? "border-red-500" : ""}
            >
              {sexOptions.map((sex) => (
                <SelectItem key={sex.id} value={sex.id.toString()}>
                  {sex.name}
                </SelectItem>
              ))}
            </Select>
            {state?.errors?.sexId && (
              <p id="state-error" className="text-sm text-red-500">
                {state.errors.sexId[0]}
              </p>
            )}
          </div>
          <Button
            type="submit"
            color="primary"
            size="sm"
            className="mt-4"
            isLoading={isPending}
          >
            {isPending ? "Agregando..." : "Agregar"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
