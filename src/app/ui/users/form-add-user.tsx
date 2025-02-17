"use client";
import { addNewUser } from "@/app/lib/actions/users/user";
import { getCatalogSex } from "@/app/lib/actions/catalogs/catalogs";
import { toast } from "sonner";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
  Form,
} from "@heroui/react";

const initialState = {
  status: "",
  message: "",
  errors: {},
};

export default function FormAddUser() {
  const [state, formAction, pending] = useActionState(addNewUser, initialState);
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
    if (state.status === "success") {
      toast.success(state.message, {
        duration: 4000,
      });
      router.push("/dashboard/users");
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Card className="p-4 w-1/2">
      <CardHeader className="flex gap-3">
        <h2 className="text-xl font-semibold text-center w-full">Nuevo usuario</h2>
      </CardHeader>
      <CardBody>
        <Form className="flex flex-col gap-4 w-full" action={formAction}>
          <Input
            isRequired
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
          />
          {state.errors?.name && (
            <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
          )}

          <Input type="text" name="lastname" placeholder="Apellido" isRequired />
          {state.errors?.lastname && (
            <p className="text-red-500 text-xs mt-1">
              {state.errors.lastname[0]}
            </p>
          )}

          <Input type="email" name="mail" placeholder="Email" isRequired />
          {state.errors?.mail && (
            <p className="text-red-500 text-xs mt-1">{state.errors.mail[0]}</p>
          )}

          <Select
            label="Sex"
            name="sexId"
            isRequired
            errorMessage={state.errors?.sexId?.[0]}
          >
            {sexOptions.map((sex) => (
              <SelectItem key={sex.id} value={sex.id.toString()}>
                {sex.name}
              </SelectItem>
            ))}
          </Select>
          {state.errors?.sexId && (
            <p className="text-red-500 text-xs mt-1">{state.errors.sexId[0]}</p>
          )}
          <div className="w-full flex justify-end gap-2">
            <Button size="md" color="secondary" onPress={() => router.push("/dashboard/users")}>
              Regresar
            </Button>
            <Button className="" type="submit" size="md" color="primary" isLoading={pending}>
              {pending ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
