const baseURL: string = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

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
};

export default apiRoutes;
