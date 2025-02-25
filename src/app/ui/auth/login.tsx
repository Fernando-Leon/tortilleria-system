'use client'
import React, { useState } from "react";
import SvgIcon from "@/app/ui/svg/logo.jsx";
import { login } from "@/app/lib/actions/auth/auth";
import { toast } from "sonner";
import { Card, CardHeader, CardBody } from "@heroui/card";    
import { Input } from "@heroui/input";
import EyeSlashFilledIcon from "../../../../public/svg/closeeye";
import EyeFilledIcon from "../../../../public/svg/openeye";
import { Button } from "@heroui/react";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="w-full max-w-md p-6 rounded-none shadow-none bg-transparent">
      <CardHeader className="flex flex-col items-center">
        <SvgIcon className="w-16 h-16"/>
        <h2 className="text-3xl font-semibold">Inicio de sesión</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <form action={ async formData => {
          const response = await login(formData);
          toast.error(response.error);
          console.log(response);
        }} className="flex flex-col gap-4">
          <Input
            label="Nombre de usuario"
            type="text"
            name="username"
          />
          <Input
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            type={isVisible ? "text" : "password"}
            name="password"
            variant="bordered"
          />

          <Button
            type="submit"
            color="primary"
            className="w-full text-white py-2 text-center transition"
          >
            Iniciar sesión
          </Button>
          <label className="text-slate-500 text-right">Next.js + Nest.js</label>
        </form>
      </CardBody>
    </Card>
  );
}
