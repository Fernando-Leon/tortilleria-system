'use server'

import apiRoutes from '@/app/lib/routes/routes';

// Catalog sex
export async function getCatalogSex() {
  const data = await fetch(apiRoutes.assets.getCatalogSexs);
  const CatalogOfSex = await data.json();
  return CatalogOfSex;
}