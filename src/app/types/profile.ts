export interface ProfileFormData {
  name: string;
  description: string;
}

export interface ActionResponseProfile {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof ProfileFormData]?: string[];
  };
}

export interface ProfileUpdateFormData {
  id: number;
  name: string;
  description: string;
}

export interface ActionResponseProfileUpdate {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof ProfileUpdateFormData]?: string[];
  };
}