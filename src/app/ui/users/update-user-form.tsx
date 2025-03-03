'use client';

import type React from "react";

import { useActionState, useEffect, useState } from "react";
import { updateUser ,getUserById } from "@/app/lib/actions/users/user";
import { getCatalogSex } from "@/app/lib/actions/catalogs/catalogs";
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
  const [sexOptions, setSexOptions] = useState<{ id: number; name: string }[]>(
    []
  );
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    mail: "",
    sexId: "",
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [sexOptions, userData] = await Promise.all([
          getCatalogSex(),
          getUserById(Number(idUser)),
        ]);

        setSexOptions(sexOptions);
        console.log("User data fetched:", userData);
        setUserData(userData);
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
        <h2 className="text-2XL font-semibold text-center">
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
              placeholder="Fernando"
              minLength={2}
              maxLength={20}
              aria-describedby="name-error"
              required
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastname">Apellido</label>
            <Input
              id="lastname"
              name="lastname"
              variant="bordered"
              placeholder="Leon"
              minLength={2}
              maxLength={20}
              aria-describedby="lastname-error"
              required
              value={userData.lastname}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, lastname: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="mail">Apellido</label>
            <Input
              id="mail"
              name="mail"
              variant="bordered"
              placeholder="Leon"
              minLength={2}
              maxLength={20}
              aria-describedby="mail-error"
              required
              value={userData.mail}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, mail: e.target.value }))
              }
            />
          </div>
          <Select
            label="Sex"
            variant="bordered"
            name="sexId"
            isRequired
            selectedKeys={[userData.sexId.toString()]}
            onSelectionChange={(keys) =>
              setUserData((prev) => ({
                ...prev,
                sexId: Array.from(keys)[0] as string,
              }))
            }
          >
            {sexOptions.map((sex) => (
              <SelectItem key={sex.id} value={sex.id.toString()}>
                {sex.name}
              </SelectItem>
            ))}
          </Select>

          <Button
            type="submit"
            color="primary"
            isLoading={isPending}
          >
            {isPending ? "Actualizando..." : "Actualizar"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
