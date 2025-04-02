'use client';
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tooltip,
  Button,
  useDisclosure,
  Input,
  Pagination
} from "@heroui/react";
import Model from "@/app/ui/components/modal";
import { getProfiles, deleteProfile } from "@/app/lib/actions/profile/profile";
import { EditIcon, DeleteIcon, SearchIcon, AddIcon } from "@/app/ui/svg/icons";
import { toast } from "sonner";
import Link from "next/link";
import ROUTES from "@/app/lib/routes/ROUTESPATH";
import { getSession } from "@/app/lib/actions/auth/sessions";
import { getPermissionsByUserId } from "@/app/lib/actions/auth/auth";

interface Profile {
  id: string;
  name: string;
  description: string;
}

const columns = [
  { key: "name", label: "NOMBRE" },
  { key: "description", label: "DESCRIPCION" },
  { key: "actions", label: "ACCIONES" },
];

export default function UserTable() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [permissions, setPermissions] = useState({
    canCreate: false,
    canRead: false,
    canUpdate: false,
    canDelete: false,
  });

  const filteredProfiles = profiles.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  async function fetchData(page: number) {
    try {
      const { data, totalPages } = await getProfiles(page);
      const session = await getSession();
      const userId = session?.userId ? Number.parseInt(session.userId, 10) : undefined;
      const allPermissions = userId ? await getPermissionsByUserId(userId) : [];

      // Filtrar permisos para la tabla de perfiles
      const profilePermissions = allPermissions.find(
        (perm) => perm.route === "/gestion/profiles"
      );

      setPermissions({
        canCreate: profilePermissions?.canCreate || false,
        canRead: profilePermissions?.canRead || false,
        canUpdate: profilePermissions?.canUpdate || false,
        canDelete: profilePermissions?.canDelete || false,
      });

      setProfiles(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  }

  const handleDelete = async () => {
    if (profileIdToDelete) {
      try {
        await deleteProfile(parseInt(profileIdToDelete));
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile.id !== profileIdToDelete)
        );
        onClose();
        toast.success("Perfil eliminado correctamente");
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar el perfil: " + error);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex gap-4 flex-col">
        <div className="w-full flex justify-between items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[25%]",
              inputWrapper: "border-1",
            }}
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon className="text-default-300" />}
            variant="bordered"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {permissions.canCreate && (
            <Button
              as={Link}
              startContent={<AddIcon />}
              color="primary"
              href={`${ROUTES.MANAGEMENT.PROFILES}/create`}
            >
              Crear perfil
            </Button>
          )}
        </div>
        <Table
          aria-label="Tabla de perfiles"
          bottomContent={
            <div className="flex w-full justify-start">
              <Pagination
                initialPage={1}
                total={totalPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          }
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {filteredProfiles.map((profile) => (
              <TableRow key={profile.id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "actions" ? (
                      <div className="relative flex items-center gap-2">
                        {permissions.canUpdate && (
                          <Tooltip content="Actualizar perfil">
                            <Button
                              as={Link}
                              color="primary"
                              href={`${ROUTES.MANAGEMENT.PROFILES}/${profile.id}`}
                              radius="full"
                              variant="light"
                              startContent={<EditIcon className="w-5 h-5" />}
                            />
                          </Tooltip>
                        )}
                        {permissions.canDelete && (
                          <Tooltip color="danger" content="Eliminar perfil">
                            <Button
                              className="flex"
                              variant="light"
                              radius="full"
                              onPress={() => {
                                setUserIdToDelete(profile.id);
                                onOpen();
                              }}
                              startContent={
                                <DeleteIcon className="w-5 h-5 text-danger" />
                              }
                            />
                          </Tooltip>
                        )}
                      </div>
                    ) : (
                      getKeyValue(profile, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Model
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDelete}
        title="Confirmación de eliminación"
        body="¿Estás seguro de que deseas eliminar este perfil?"
      />
    </>
  );
}