'use server'

import apiRoutes from '@/app/lib/routes/routes';
import type { ActionResponse, UserFormData, UserUpdateFormData, ActionResponseUpdate } from '@/app/types/user'
import { z } from 'zod';


const userSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener como minimo dos letras" }),
  lastname: z.string().min(2, { message: "El apellido debe tener como minimo dos letras" }),
  mail: z.string().email({ message: "Direccion de correo invalido" }),
  sexId: z.number().int().positive({ message: "El sexo es requerido" }),
});


// Create new user
export async function submitNewUser(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  try {
    const rawData: UserFormData = {
      name: formData.get('name') as string,
      lastname: formData.get('lastname') as string,
      mail: formData.get('mail') as string,
      sexId: Number(formData.get('sexId')),
    }

    // Validate the form data
    const validatedData = userSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
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
      message: 'Address saved successfully!',
    }
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred:' + error,
    }
  }
}


//Update user
export async function updateUser(prevState: ActionResponseUpdate | null, formData: FormData): Promise<ActionResponseUpdate> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  try {  
    const rawData: UserUpdateFormData = {
      id: Number(formData.get("id")),
      name: formData.get("name") as string,
      lastname: formData.get("lastname") as string,
      mail: formData.get("mail") as string,
      sexId: Number(formData.get("sexId")),
    }

    console.log("Raw data:", rawData) 

    // Validate the form data
    const validatedData = userSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    // Send the data to the server
    const response = await fetch(apiRoutes.user.updateUserById(rawData.id), {
      method: "PATCH", // Use PUT for updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    })

    if (!response.ok) {
      throw new Error("Failed to update user")
    }

    return {
      success: true,
      message: "User updated successfully!",
    }
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred: " + (error instanceof Error ? error.message : String(error)),
    }
  }
}

/* Show all users */
export async function getUsers() {
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