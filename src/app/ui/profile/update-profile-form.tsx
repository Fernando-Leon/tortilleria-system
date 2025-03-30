'use client';

import type React from "react";

import { useActionState, useEffect, useState } from "react";
import { updateProfile, getProfileById } from "@/app/lib/actions/profile/profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { ActionResponseProfileUpdate } from "@/app/types/profile";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";
import Link from "next/link";


const initialState: ActionResponseProfileUpdate = {
  success: false,
  message: "",
};

interface FormUpdateProfileProps {
  idprofile: string;
}

export const FormUpdateProfile: React.FC<FormUpdateProfileProps> = ({ idprofile: idProfile }) => {
  const [state, action, isPending] = useActionState(
    updateProfile,
    initialState
  );

  const [profileData, setProfileData] = useState({
    name: "",
    description: "",
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [userData] = await Promise.all([
          getProfileById(Number(idProfile)),
        ]);


        console.log("User data fetched:", userData);
        setProfileData({
            name: userData.name,
            description: userData.description,
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error al cargar los datos del perfil");
      }
    }
    fetchData();
  }, [idProfile]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/dashboard/profiles");
    }
  }, [state.success, state.message, router]);

  return (
    <Card className="p-4 w-1/2">
      <CardHeader className="flex gap-3">
        <h2 className="text-2xl font-semibold text-center">
          Actualizar perfil
        </h2>
      </CardHeader>
      <CardBody>

        <form className="flex flex-col gap-4 w-full" action={action}>
        <Input
              id="id"
              name="id"
              placeholder="Administrador"
              minLength={2}
              maxLength={20}
              aria-describedby="name-error"
              variant="bordered"
              required
              type="hidden"
              value={idProfile}
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
              value={profileData.name}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">Descripcion</label>
            <Input
              id="description"
              name="description"
              minLength={2}
              maxLength={20}
              aria-describedby="description-error"
              variant="bordered"
              required
              value={profileData.description}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
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
              href="/dashboard/profiles"
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
