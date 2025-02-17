'use server'

// Catalog sex
export async function getCatalogSex() {
  const data = await fetch("https://tortilleria-backend-production.up.railway.app/sexs");
  const CatalogOfSex = await data.json();
  return CatalogOfSex;
}