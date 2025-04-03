"use server"

import type { LoginFormData, ActionResponseLogin } from "@/app/types/user"
import { createSession, deleteSession } from "@/app/lib/actions/auth/sessions"
import { getSession } from "@/app/lib/actions/auth/sessions"
import { redirect } from "next/navigation"

import { z } from "zod"

const authSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "El nombre debe tener como mínimo dos letras" })
    .refine((value) => value.trim().length > 0, {
      message: "El nombre no puede estar vacío",
    }),
  password: z
    .string()
    .trim()
    .min(2, { message: "La contraseña debe tener como mínimo dos letras " })
    .refine((value) => value.trim().length > 0, {
      message: "La contraseña no puede estar vacia",
    }),
})

export async function login(prevState: ActionResponseLogin, formData: FormData): Promise<ActionResponseLogin> {

  try {
    const rawData: LoginFormData = {
      name: formData.get("name") as string,
      password: formData.get("password") as string,
    }

    const validatedData = authSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        message: "Corrige los errores en el formulario",
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    console.log("Data to send: ", validatedData.data)
    const response = await fetch('https://tortilleria-backend-production-67b0.up.railway.app/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    })

    console.log("Response: ", response);

    const result = await response.json();

    if (!response.ok) {
    return {
        success: false,
        message: result.message || "Credenciales incorrectas",
        errors: result.errors || {},
        }
    }
    
    await createSession(result.userId, result.token, result.name)

    const session = await getSession()

    console.log("Session created: ", session)

    

    // return { 
    //     success: true, 
    //     message: result.message,
    // }
  } catch (error) {
    console.error("💥 Server Action: Unexpected error during login:", error)
    return { success: false, message: "An error occurred during login" + error }
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession()
  redirect('/')
}

export async function getPermissionsByUserId(id: number) {
  const response = await fetch(`https://tortilleria-backend-production-67b0.up.railway.app/auth/permissions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const result = await response.json()

  console.log("Resultado de la peticion de la api al login: ", result)
  return result;
}