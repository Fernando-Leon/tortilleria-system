'use server'

import apiRoutes from '@/app/lib/routes/routes';
import type { ActionResponse, UserFormData, UserUpdateFormData, ActionResponseUpdate } from '@/app/types/user'
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().trim().min(2, { message: "El nombre debe tener como mínimo dos letras" }).refine(value => value.trim().length > 0, { message: "El nombre no puede estar vacío" }),
  password: z.string().trim().min(2, { message: "La contraseña debe tener como mínimo dos letras " }).refine(value => value.trim().length > 0, { message: "La contraseña no puede estar vacia" }),
  roleId: z.number().int().positive({ message: "El rol es requerido" }),
  statusId: z.number().int().positive({ message: "El estado es requerido" }),
});

const userSchemaUpdate = z.object({
  name: z.string().trim().min(2, { message: "El nombre debe tener como mínimo dos letras" }).refine(value => value.trim().length > 0, { message: "El nombre no puede estar vacío" }),
  roleId: z.number().int().positive({ message: "El rol es requerido" }),
  statusId: z.number().int().positive({ message: "El estado es requerido" }),
});

// Create new user
export async function submitNewUser(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  try {
    const rawData: UserFormData = {
      name: formData.get('name') as string,
      password: formData.get('password') as string,
      roleId: Number(formData.get('roleId')),
      statusId: Number(formData.get('statusId')),
    }

    // Validate the form data
    const validatedData = userSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Corrige los errores en el formulario',
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    // Send the data to the server
    await fetch(apiRoutes.user.createNewUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData.data),
    })

    return {
      success: true,
      message: 'Usuario creado correctamente!',
    }
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred:' + error,
    }
  }
}

export async function updateUser(prevState: ActionResponseUpdate | null, formData: FormData): Promise<ActionResponseUpdate> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  try {  
    const rawData: UserUpdateFormData = {
      id: Number(formData.get("id")),
      name: formData.get("name") as string,
      roleId: Number(formData.get("roleId")),
      statusId: Number(formData.get("statusId")),
    }

    console.log("Raw data:", rawData) 

    // Validate the form data
    const validatedData = userSchemaUpdate.safeParse(rawData)

    console.log("Validated data:", validatedData)

    if (!validatedData.success) {
      return {
        success: false,
        message: "Corrige los errores en el formulario",
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    console.log("Llega hasta aquí");

    // Send the data to the server
    const response = await fetch(apiRoutes.user.updateUserById(rawData.id), {
      method: "PATCH", // Use PUT for updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    })

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario")
    }

    return {
      success: true,
      message: "Usuario actualizado correctamente!",
    }
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred: " + (error instanceof Error ? error.message : String(error)),
    }
  }
}

const itemsPerPage = 8;

export async function getUsers(page = 1) {
  const data = await fetch(`${apiRoutes.user.getAllUsers}`);
  
  if (!data.ok) {
    throw new Error('Error al obtener los usuarios');
  }

  const users = await data.json();
  const totalUsers = users.length; // Calcula el total de usuarios
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  // Slice para paginar los resultados
  const paginatedUsers = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Transformación de los usuarios para solo enviar el nombre del estado
  const transformedUsers = paginatedUsers.map((user: { status: { name: string; }; role: { name: string } },) => ({
    ...user,
    role: user.role.name, // Solo pasamos el `name` del role
    status: user.status.name, // Solo pasamos el `name` del status
  }));

  return {
    data: transformedUsers,
    totalPages,
  };
}

export async function getAllUsers() {
  const data = await fetch(apiRoutes.user.getAllUsers);
  const users = await data.json();
  return users;
}

/* Get user by Id */
export async function getUserById(id: number) {
  const data = await fetch(apiRoutes.user.getUserById(id));
  const user = await data.json();
  return user;
}

/* Delete user */
export const deleteUser = async (id: number) => {
  const response = await fetch(apiRoutes.user.deleteUserById(id), {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Algo salió mal');
  }

  return { message: 'Usuario eliminado correctamente' };
}