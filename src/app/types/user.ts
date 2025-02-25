export interface UserFormData {
  name: string;
  lastname?: string;
  mail: string;
  sexId: number;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UserFormData]?: string[];
  };
}

export interface UserUpdateFormData extends UserFormData {
  id: number;
}

export interface ActionResponseUpdate {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UserUpdateFormData]?: string[];
  };
}