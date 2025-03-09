'use server'

import apiRoutes from '@/app/lib/routes/routes';

// Catalog sex
export async function getCatalogStatus() {
  const data = await fetch(apiRoutes.assets.getCatalogStatus);
  const CatalogOfStatus = await data.json();
  return CatalogOfStatus;
}

// Catalog roles
export async function getCatalogRoles() {
  const data = await fetch(apiRoutes.assets.getCatalogRoles);
  const CatalogOfRoles = await data.json();
  return CatalogOfRoles;
}