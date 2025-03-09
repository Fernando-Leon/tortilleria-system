export interface UserFormData {
  name: string;
  password: string;
  role?: string;
  statusId: number;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UserFormData]?: string[];
  };
}

export interface UserUpdateFormData {
  id: number;
  name: string;
  role?: string;
  statusId: number;
}

export interface ActionResponseUpdate {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UserUpdateFormData]?: string[];
  };
}