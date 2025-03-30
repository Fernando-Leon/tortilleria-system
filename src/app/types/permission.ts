export interface PermissionFormData {
  name: string;
  profileId: number;
  featureId: number;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}