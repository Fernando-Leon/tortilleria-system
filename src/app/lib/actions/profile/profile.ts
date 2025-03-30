'use server'

import apiRoutes from '@/app/lib/routes/routes';
import type { ActionResponseProfile, ProfileFormData, ProfileUpdateFormData, ActionResponseProfileUpdate } from '@/app/types/profile'
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().trim().min(2, { message: "El nombre debe tener como mínimo dos letras" }).refine(value => value.trim().length > 0, { message: "El nombre no puede estar vacío" }),
  description: z.string().trim().min(2, { message: "La descripción debe tener como mínimo dos letras " }).refine(value => value.trim().length > 0, { message: "La descripción no puede estar vacia" }),
});

const profileSchemaUpdate = z.object({
  name: z.string().trim().min(2, { message: "El nombre debe tener como mínimo dos letras" }).refine(value => value.trim().length > 0, { message: "El nombre no puede estar vacío" }),
  description: z.string().trim().min(2, { message: "La descripción debe tener como mínimo dos letras " }).refine(value => value.trim().length > 0, { message: "La descripción no puede estar vacia" }),
});

// Create new profile
export async function submitNewProfile(prevState: ActionResponseProfile | null, formData: FormData): Promise<ActionResponseProfile> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  try {
    const rawData: ProfileFormData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
    };

    // Validate the form data
    const validatedData = profileSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Corrige los errores en el formulario',
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // Send the data to the server
    const response = await fetch(apiRoutes.profile.createNewProfile, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData.data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return {
      success: true,
      message: 'Perfil creado correctamente!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al crear el perfil: ' + error,
    };
  }
}


//Paginacion
const itemsPerPage = 8;

export async function getProfiles(page = 1) {
  const data = await fetch(`${apiRoutes.profile.getAllProfiles}`);
  
  if (!data.ok) {
    throw new Error('Error al obtener los perfiles');
  }

  const profiles = await data.json();
  const totalProfiles = profiles.length; // Calcula el total de usuarios
  const totalPages = Math.ceil(totalProfiles / itemsPerPage);

  // Slice para paginar los resultados
  const paginatedProfiles = profiles.slice((page - 1) * itemsPerPage, page * itemsPerPage);


  return {
    data: paginatedProfiles,
    totalPages,
  };
}

export async function getAllProfiles() {
  const data = await fetch(apiRoutes.profile.getAllProfiles);
  const profiles = await data.json();
  return profiles;
}


/* Delete profile */
export const deleteProfile = async (id: number) => {
  try {
    const response = await fetch(apiRoutes.profile.deleteProfileById(id), {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Algo salió mal');
    }

    const data = await response.json();
    return { message: 'Perfil eliminado correctamente, ' + data.message };
  } catch (error) {
    console.error('Error eliminando perfil:', error);
    throw error;
  }
};

/* Get profile by Id */
export async function getProfileById(id: number) {
  const data = await fetch(apiRoutes.profile.getProfileById(id));
  const profile = await data.json();
  return profile;
}


// Update profile

export async function updateProfile(prevState: ActionResponseProfileUpdate | null, formData: FormData): Promise<ActionResponseProfileUpdate> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  try {  
    const rawData: ProfileUpdateFormData = {
      id: Number(formData.get("id")),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    }

    console.log("Raw data:", rawData) 

    // Validate the form data
    const validatedData = profileSchemaUpdate.safeParse(rawData)

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
    const response = await fetch(apiRoutes.profile.updateProfileById(rawData.id), {
      method: "PATCH", // Use PUT for updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    })

    if (!response.ok) {
      throw new Error("Error al actualizar el perfil")
    }

    return {
      success: true,
      message: "Perfil actualizado correctamente!",
    }
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred: " + (error instanceof Error ? error.message : String(error)),
    }
  }
}