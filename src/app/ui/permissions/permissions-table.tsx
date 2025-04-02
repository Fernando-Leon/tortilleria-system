"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Checkbox,
  Select,
  SelectItem,
} from "@heroui/react";
import { toast } from "sonner";
import { getAllPermissionsByProfile, updatePermissionById } from "@/app/lib/actions/permissions/permissions";
import { getCatalogPofiles } from "@/app/lib/actions/catalogs/catalogs";
import { getSession } from "@/app/lib/actions/auth/sessions";
import { getPermissionsByUserId } from "@/app/lib/actions/auth/auth";
import { UpdateIcon } from "@/app/ui/svg/icons";

interface Permissions {
  id: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  profile: string;
  feature: string;
  route?: string; // Added the 'route' property
}

interface Profile {
  id: string;
  name: string;
  description: string;
}

const columns = [
  { key: "feature", label: "MODULO" },
  { key: "canCreate", label: "CREAR" },
  { key: "canRead", label: "LEER" },
  { key: "canUpdate", label: "ACTUALIZAR" },
  { key: "canDelete", label: "ELIMINAR" },
];

export default function PermissionsTable() {
  const [permissions, setPermissions] = useState<Permissions[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);

  useEffect(() => {
    fetchProfiles();
    fetchUserPermissions();
  }, []);

  async function fetchProfiles() {
    try {
      const profilesData = await getCatalogPofiles();
      setProfiles(profilesData);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  }

  async function fetchUserPermissions() {
    try {
      const session = await getSession();
      const userId = session?.userId ? Number.parseInt(session.userId, 10) : undefined;
      const allPermissions = userId ? await getPermissionsByUserId(userId) : [];

      // Verificar permisos para la ruta de permisos
      const permissionsForRoute = allPermissions.find(
        (perm: Permissions) => perm.route === "/gestion/permissions"
      );

      setCanUpdate(permissionsForRoute?.canUpdate || false);
    } catch (error) {
      console.error("Error fetching user permissions:", error);
    }
  }

  async function fetchData(profileId: string) {
    try {
      setLoading(true);
      const allPermissions = await getAllPermissionsByProfile(profileId);
      setPermissions(allPermissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleProfileChange = (profileId: string) => {
    setSelectedProfileId(profileId);
    fetchData(profileId);
  };

  const handleCheckboxChange = (id: string, key: keyof Permissions) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.id === id ? { ...permission, [key]: !permission[key] } : permission
      )
    );
  };

  const handleUpdatePermissions = async () => {
    if (!canUpdate) {
      toast.error("No tienes permisos para actualizar.");
      return;
    }

    try {
      for (const permission of permissions) {
        await updatePermissionById(permission.id, {
          canCreate: permission.canCreate,
          canRead: permission.canRead,
          canUpdate: permission.canUpdate,
          canDelete: permission.canDelete,
        });
      }
      toast.success("Permisos actualizados correctamente");
      fetchData(selectedProfileId);
    } catch (error) {
      console.error("Error updating permissions:", error);
      toast.error("Error actualizando permisos");
    }
  };

  return (
    <>
      <div className="flex gap-4 flex-col">
        <div className="w-full flex justify-between items-end">
          <Select
            className="w-1/4"
            placeholder="Seleccionar perfil"
            value={selectedProfileId}
            onChange={(e) => handleProfileChange(e.target.value)}
          >
            {profiles.map((profile) => (
              <SelectItem key={profile.id} value={profile.id}>
                {profile.name}
              </SelectItem>
            ))}
          </Select>
          {canUpdate && (
            <Button startContent={<UpdateIcon />} color="primary" onClick={handleUpdatePermissions}>
              Actualizar permisos
            </Button>
          )}
        </div>
        <Table aria-label="Tabla de permisos">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={loading ? "Cargando..." : "Selecciona un perfil"}>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                {(columnKey) => (
                  <TableCell>
                    {["canCreate", "canRead", "canUpdate", "canDelete"].includes(columnKey as string) ? (
                      <Checkbox
                        isSelected={permission[columnKey as keyof Permissions] as boolean}
                        onChange={() => handleCheckboxChange(permission.id, columnKey as keyof Permissions)}
                        isDisabled={!canUpdate}
                      />
                    ) : (
                      getKeyValue(permission, columnKey as string)
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}