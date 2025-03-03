export interface FixedAssetFormData {
  name: string;
  description: string;
  serialNumber: string;
  brand: number;
  model: number;
  purchaseDate: string;
  purchaseValue: number;
  usefulLife: number;
  status: string;
  notes: string;
  assetCategoryId: number;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof FixedAssetFormData]?: string[];
  };
}

export interface FixedAssetUpdateFormData extends FixedAssetFormData {
  id: number;
}

export interface ActionResponseUpdate {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof FixedAssetUpdateFormData]?: string[];
  };
}