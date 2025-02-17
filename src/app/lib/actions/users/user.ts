'use server'

import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  lastname: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
  mail: z.string().email({ message: "Invalid email address" }),
  sexId: z.number().int().positive({ message: "Sex ID must be a positive integer" }),
});

/* Show all users */
export async function getUsers() {
  const data = await fetch("https://tortilleria-backend-production.up.railway.app/users");
  const users = await data.json();
  return users;
}


/* Get user by Id */
export async function getUserById(id: number) {
  const data = await fetch(`https://tortilleria-backend-production.up.railway.app/users/${id}`);
  const user = await data.json();
  return user;
}

/* Add new User */
export async function addNewUser(prevState: any, formData: FormData) {
  const validateFields = userSchema.safeParse({
    name: formData.get("name"),
    lastname: formData.get("lastname"),
    mail: formData.get("mail"),
    sexId: Number(formData.get("sexId")),
  })

  if (!validateFields.success) {
    return {
      status: "error",
      message: "Validation failed",
      errors: validateFields.error.flatten().fieldErrors,
    }
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await fetch("https://tortilleria-backend-production.up.railway.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateFields.data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        status: "error",
        message: errorData.message || "Something went wrong",
      }
    }

    return {
      status: "success",
      message: "User added successfully",
    }
  } catch (error) {
    console.error("Error adding user:", error)
    return {
      status: "error",
      message: "An unexpected error occurred",
    }
  }
}


/* Delete user */

export const deleteUser = async (id: number) => {
  const response = await fetch(`https://tortilleria-backend-production.up.railway.app/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Algo salió mal');
  }

  return { message: 'Usuario eliminado correctamente' };
}

/* Update user */
export async function updateUser(userId: string, prevState: any, formData: FormData) {

  const validateFields = userSchema.safeParse({
    name: formData.get("name"),
    lastname: formData.get("lastname"),
    mail: formData.get("mail"),
    sexId: Number(formData.get("sexId")),
  })

  if (!validateFields.success) {
    return {
      status: "error",
      message: "Validation failed",
      errors: validateFields.error.flatten().fieldErrors,
    }
  }

  try {
    const response = await fetch(`https://tortilleria-backend-production.up.railway.app/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateFields.data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("API error:", errorData)
      return {
        status: "error",
        message: errorData.message || "Something went wrong",
      }
    }

    const responseData = await response.json()
    console.log("API response:", responseData)

    return {
      status: "success",
      message: "User updated successfully",
    }
  } catch (error) {
    console.error("Error updating user:", error)
    return {
      status: "error",
      message: "An unexpected error occurred",
    }
  }
}