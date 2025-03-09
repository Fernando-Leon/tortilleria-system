'use client';

import type React from "react";

import { useActionState, useEffect, useState } from "react";
import { updateUser ,getUserById } from "@/app/lib/actions/users/user";
import { getCatalogStatus, getCatalogRoles } from "@/app/lib/actions/catalogs/catalogs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { ActionResponseUpdate } from "@/app/types/user";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";
import Link from "next/link";


const initialState: ActionResponseUpdate = {
  success: false,
  message: "",
};

interface FormUpdateUserProps {
  idUser: string;
}

export const FormUpdateUser: React.FC<FormUpdateUserProps> = ({ idUser }) => {
  const [state, action, isPending] = useActionState(
    updateUser,
    initialState
  );
  const [statusOptions, setStatusOptions] = useState<{ id: number; name: string }[]>(
    []
  );
  const [roleOptions, setRoleOptions] = useState<{ id: number; name: string }[]>(
    []
  );
  const [userData, setUserData] = useState({
    name: "",
    roleId: "",
    statusId: ""
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [roleOptions, statusOptions, userData] = await Promise.all([
          getCatalogRoles(),
          getCatalogStatus(),
          getUserById(Number(idUser)),
        ]);

        setRoleOptions(roleOptions);
        setStatusOptions(statusOptions);
        console.log("User data fetched:", userData);
        setUserData({
            name: userData.name,
            roleId: userData.role.id.toString(),
            statusId: userData.status.id.toString()
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error al cargar los datos del usuario");
      }
    }
    fetchData();
  }, [idUser]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/dashboard/users");
    }
  }, [state.success, state.message, router]);

  return (
    <Card className="p-4 w-1/2">
      <CardHeader className="flex gap-3">
        <h2 className="text-2xl font-semibold text-center">
          Actualizar usuario
        </h2>
      </CardHeader>
      <CardBody>

        <form className="flex flex-col gap-4 w-full" action={action}>
        <Input
              id="id"
              name="id"
              placeholder="Fernando"
              minLength={2}
              maxLength={20}
              aria-describedby="name-error"
              variant="bordered"
              required
              type="hidden"
              value={idUser}
            />
          <div className="space-y-2">
            <label htmlFor="name">Nombre</label>
            <Input
              id="name"
              name="name"
              minLength={2}
              maxLength={20}
              aria-describedby="name-error"
              variant="bordered"
              required
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="roleId">Rol</label>
            <Select
              variant="bordered"
              name="roleId"
              isRequired
              selectedKeys={[userData.roleId]}
              onSelectionChange={(keys) =>
                setUserData((prev) => ({
                  ...prev,
                  roleId: Array.from(keys)[0] as string,
                }))
              }
            >
              {roleOptions.map((role) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.name}
                </SelectItem>
              ))}
            </Select>
            {state?.errors?.roleId && (
              <p id="roleId-error" className="text-sm text-red-500">
                {state.errors.roleId[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="statusId">Estado</label>
            <Select
              variant="bordered"
              name="statusId"
              isRequired
              selectedKeys={[userData.statusId]}
              onSelectionChange={(keys) =>
                setUserData((prev) => ({
                  ...prev,
                  statusId: Array.from(keys)[0] as string,
                }))
              }
            >
              {statusOptions.map((status) => (
                <SelectItem key={status.id} value={status.id.toString()}>
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
              {isPending ? "Actualizando..." : "Actualizar"}
            </Button>
            <Button
              color="primary"
              variant="bordered"
              as={Link}
              href="/dashboard/users"
              className="mt-4 w-1/2"
            >
              Regresar
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
