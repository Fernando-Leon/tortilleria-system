'use server';

import apiRoutes from "../../routes/routes";

export async function getAllPermissionsByProfile(id: string) {
  const data = await fetch(apiRoutes.permission.getPermissionsByProfileId(id));
  const permissions = await data.json();

  const transformedPermissions = permissions.map((permission: { profile: { name: string; }; feature: { name: string } }) => ({
    ...permission,
    profile: permission.profile.name,
    feature: permission.feature.name,
  }));

  return transformedPermissions;
}

export async function updatePermissionById(id: string, permission: {
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}) {

  console.log('permission', permission);
  console.log('id', id);
  const response = await fetch(apiRoutes.permission.updatePermissionById(id), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(permission),
  });

  if (!response.ok) {
    throw new Error('Error updating permission');
  }

  return await response.json();
}