const baseURL: string = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/**
 * 
 * 
 * 🧑‍💻 AUTH API
 */

type Auth = {
  login: string;
  register: string;
  getPermissionsByUserId: (id: string | number) => string;
}

const authBasePath = `${baseURL}/auth`;

const auth: Auth = {
  login: `${authBasePath}/login`,
  register: `${authBasePath}/register`,
  getPermissionsByUserId: (id) => `${authBasePath}/permissions/${id}`,
};

/**
 * 
 * 
 * 🧑‍💻 User API
 */

type Permission = {
  getAllPermissions: string;
  createNewPermission: string;
  getPermissionById: (id: string | number) => string;
  updatePermissionById: (id: string | number) => string;
  deletePermissionById: (id: string | number) => string;
  getPermissionsByProfileId: (id: string | number) => string;
};

const permissionBasePath = `${baseURL}/permission`;

const permission: Permission = {
  getAllPermissions: permissionBasePath,
  createNewPermission: permissionBasePath,
  getPermissionById: (id) => `${permissionBasePath}/${id}`,
  updatePermissionById: (id) => `${permissionBasePath}/booleans/${id}`,
  deletePermissionById: (id) => `${permissionBasePath}/${id}`,
  getPermissionsByProfileId: (id) => `${permissionBasePath}/profile/${id}`,
};

/**
 * 
 * 
 * 🧑‍💻 User API
 */

type User = {
  getAllUsers: string;
  createNewUser: string;
  getUserById: (id: string | number) => string;
  updateUserById: (id: string | number) => string;
  deleteUserById: (id: string | number) => string;
};

const userBasePath = `${baseURL}/users`;

const user: User = {
  getAllUsers: userBasePath,
  createNewUser: userBasePath,
  getUserById: (id) => `${userBasePath}/${id}`,
  updateUserById: (id) => `${userBasePath}/${id}`,
  deleteUserById: (id) => `${userBasePath}/${id}`,
};

/**
 * 
 * 
 * 🧑‍💻 Profile API
 */

type Profile = {
  getAllProfiles: string;
  createNewProfile: string;
  getProfileById: (id: string | number) => string;
  updateProfileById: (id: string | number) => string;
  deleteProfileById: (id: string | number) => string;
};

const profileBasePath = `${baseURL}/profile`;

const profile: Profile = {
  getAllProfiles: profileBasePath,
  createNewProfile: profileBasePath,
  getProfileById: (id) => `${profileBasePath}/${id}`,
  updateProfileById: (id) => `${profileBasePath}/${id}`,
  deleteProfileById: (id) => `${profileBasePath}/${id}`,
};

/**
 * 
 * 
 * 🛒 Product API
 */

type ProductApi = {
  getAllProducts: string;
  getProductById: (id: string | number) => string;
  createProduct: string;
  updateProductById: (id: string | number) => string;
  deleteProductById: (id: string | number) => string;
};

const productBasePath = `${baseURL}/products`;

const productApi: ProductApi = {
  getAllProducts: productBasePath,
  createProduct: productBasePath,
  getProductById: (id) => `${productBasePath}/${id}`,
  updateProductById: (id) => `${productBasePath}/${id}`,
  deleteProductById: (id) => `${productBasePath}/${id}`,
};

/**
 * 
 * 
 * 🚀 API Routes
 */

type Assets = {
  getCatalogStatus: string;
  getCatalogRoles: string;
};

const assets: Assets = {
  getCatalogStatus: `${baseURL}/status`,
  getCatalogRoles: `${baseURL}/roles`,
};

/**
 * 
 * 
 * 🚀 API Routes
 */

const apiRoutes = {
  user,
  productApi,
  assets,
  auth,
  profile,
  permission
};

export default apiRoutes;
