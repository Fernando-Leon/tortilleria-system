"use client"

import React, { useState, useActionState, useEffect } from "react"
import { login } from "@/app/lib/actions/auth/auth"
import { useRouter } from "next/navigation";
import type { ActionResponseLogin } from "@/app/types/user";
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { LampContainer } from '@/app/ui/components/lamp';
import { Card, CardHeader, CardBody, Input, Button } from '@heroui/react';
import { EyeSlashFilledIcon, EyeFilledIcon } from '@/app/ui/svg/icons';
import { useTheme } from "next-themes"
import { toast } from "sonner";

const initialState: ActionResponseLogin = {
  success: false,
  message: "",
};

export default function Login() {
  const [state, action, isPending] = useActionState(
    login,
    initialState
  )
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard")
    }
    if(!state.success && state.message) {
      toast.error(state.message)
    }
  }, [state, router])

  return (
    <div className="w-full h-full grid grid-cols-5 max-sm:flex">
      <div className="flex flex-col w-full h-full content-between justify-center col-span-2 p-20 pt-10 pb-10 max-sm:p-5">
        <div className="flex-none flex justify-start w-full items-center gap-2">
          <Image
            src={theme === 'dark' ? '/Icon-Dark.svg' : '/Icon.svg'}
            alt="logo"
            width={50}
            height={60}
          />
          <h3 className="text-3xl font-bold">Tortilleria</h3>
        </div>
        <div className="flex-grow flex w-full items-center pr-14 pl-14 max-sm:pr-6 max-sm:pl-6">
          <Card className="w-full rounded-none shadow-none flex dark:bg-transparent">
            <CardHeader className="flex flex-col items-start">
              <h2 className="text-3xl font-bold">Inicio de sesión</h2>
              <p className="text-sm text-gray-900 dark:text-gray-300">
                Ingresa tus credenciales para ingresar al sistema
              </p>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <form
                action={action}
                className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-small opacity-75">Nombre usuario</label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="tu nombre de usuario"
                    variant="bordered"
                    aria-describedby="name-error"
                    className={state?.errors?.name ? "border-red-500" : ""}
                  />
                  {
                    state?.errors?.name && (
                      <p id="name-error" className="text-sm text-red-500">
                        {state.errors.name}
                      </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-small opacity-75">Contraseña</label>
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
                    id="password"
                    placeholder="tu contraseña"
                    type={isVisible ? 'text' : 'password'}
                    name="password"
                    variant="bordered"
                  />
                  {state?.errors?.password && (
                    <p id="password-error" className="text-sm text-red-500">
                      {state.errors.password}
                    </p>
                  )}
                </div>

                <Button
                  isLoading={isPending}
                  type="submit"
                  color="primary"
                  className="w-full py-2 text-center transition"
                >
                  {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
        <div className="flex justify-start">
          <p className="font-thin text-sm">
            Realizado por:{' '}
            <Link href="#" className="text-gray-700 dark:text-white">
              Fernando Leon
            </Link>
          </p>
        </div>
      </div>
      <div className="col-span-3 relative max-sm:hidden"> 
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Bienvenido <br /> excelente día
          </motion.h1>
        </LampContainer>
      </div>
    </div>
  )
}