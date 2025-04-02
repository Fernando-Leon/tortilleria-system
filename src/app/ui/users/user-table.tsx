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
  Button,
  useDisclosure,
  Input,
  Pagination,
  Tooltip,
} from "@heroui/react";
import Model from "@/app/ui/components/modal";
import { getUsers, deleteUser } from "@/app/lib/actions/users/user";
import { EditIcon, DeleteIcon, SearchIcon, AddIcon } from "@/app/ui/svg/icons";
import { toast } from "sonner";
import Link from "next/link";
import ROUTES from "@/app/lib/routes/ROUTESPATH";
import { getSession } from "@/app/lib/actions/auth/sessions";
import { getPermissionsByUserId } from "@/app/lib/actions/auth/auth";

interface User {
  id: string;
  name: string;
  profile: { id: number; name: string; description: string };
  status: { id: number; name: string; description: string };
}

const columns = [
  { key: "name", label: "NOMBRE" },
  { key: "profile", label: "PERFIL" },
  { key: "status", label: "ESTADO" },
  { key: "actions", label: "ACCIONES" },
];

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [permissions, setPermissions] = useState({
    canCreate: false,
    canRead: false,
    canUpdate: false,
    canDelete: false,
  });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  async function fetchData(page: number) {
    try {
      const { data, totalPages } = await getUsers(page);
      const session = await getSession();
      const userId = session?.userId ? Number.parseInt(session.userId, 10) : undefined;
      const allPermissions = userId ? await getPermissionsByUserId(userId) : [];

      // Filtrar permisos para la tabla de usuarios
      const userPermissions = allPermissions.find(
        (perm: { route: string; canCreate?: boolean; canRead?: boolean; canUpdate?: boolean; canDelete?: boolean }) =>
          perm.route === "/ventas/facturacion/detalles/users"
      );

      setPermissions({
        canCreate: userPermissions?.canCreate || false,
        canRead: userPermissions?.canRead || false,
        canUpdate: userPermissions?.canUpdate || false,
        canDelete: userPermissions?.canDelete || false,
      });

      setUsers(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const handleDelete = async () => {
    if (userIdToDelete) {
      try {
        await deleteUser(parseInt(userIdToDelete));
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userIdToDelete)
        );
        onClose();
        toast.success("Usuario eliminado correctamente");
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar el usuario");
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
              href={`${ROUTES.VENTAS.USERS}/create`}
            >
              Crear usuario
            </Button>
          )}
        </div>
        <Table
          aria-label="Tabla de usuarios"
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
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "actions" ? (
                      <div className="relative flex items-center gap-2">
                        {permissions.canUpdate && (
                          <Tooltip content="Actualizar usuario">
                            <Button
                              as={Link}
                              color="primary"
                              href={`${ROUTES.VENTAS.USERS}/${user.id}`}
                              radius="full"
                              variant="light"
                              startContent={<EditIcon className="w-5 h-5" />}
                            />
                          </Tooltip>
                        )}
                        {permissions.canDelete && (
                          <Tooltip color="danger" content="Eliminar usuario">
                            <Button
                              className="flex"
                              variant="light"
                              radius="full"
                              onPress={() => {
                                setUserIdToDelete(user.id);
                                onOpen();
                              }}
                              startContent={
                                <DeleteIcon className="w-5 h-5 text-danger" />
                              }
                            />
                          </Tooltip>
                        )}
                      </div>
                    ) : columnKey === "status" ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="flat"
                          color={user.status.name === "Activo" ? "success" : "danger"}
                          radius="full"
                        >
                          {getKeyValue(user, columnKey)}
                        </Button>
                      </div>
                    ) : (
                      getKeyValue(user, columnKey)
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
        body="¿Estás seguro de que deseas eliminar este usuario?"
      />
    </>
  );
}