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
  getCatalogSexs: string;
};

const assets: Assets = {
  getCatalogSexs: `${baseURL}/sexs`,
};

/**
 * 
 * 
 * 🚀 API Routes
 */

type FixedAssets = {
  getAllFixedAssets: string;
  createFixedAsset: string;
  getFixedAssetById: (id: string | number) => string;
  updateFixedAssetById: (id: string | number) => string;
  deleteFixedAssetById: (id: string | number) => string;
} 

const FixedAssetsBasePath = `${baseURL}/fixed-assets`;

const fixedAssets: FixedAssets = {
  getAllFixedAssets: FixedAssetsBasePath,
  createFixedAsset: FixedAssetsBasePath,
  getFixedAssetById: (id) => `${FixedAssetsBasePath}/${id}`,
  updateFixedAssetById: (id) => `${FixedAssetsBasePath}/${id}`,
  deleteFixedAssetById: (id) => `${FixedAssetsBasePath}/${id}`,
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
  fixedAssets,
};

export default apiRoutes;
