export interface UserFormData {
  name: string;
  password: string;
  profileId: number;
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
  profileId: number;
  statusId: number;
}

export interface ActionResponseUpdate {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UserUpdateFormData]?: string[];
  };
}

export interface LoginFormData {
  name: string;
  password: string;
}

export interface ActionResponseLogin {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof LoginFormData]?: string[];
  };
} 