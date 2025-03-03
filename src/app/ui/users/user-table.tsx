"use client";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Pagination,
} from "@heroui/react";
import { getUsers, deleteUser } from "@/app/lib/actions/users/user";
import { EditIcon, DeleteIcon, SearchIcon, AddIcon } from "@/app/ui/svg/icons";
import { toast } from "sonner";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  lastname: string;
  mail: string;
  sex: string;
}

const columns = [
  { key: "name", label: "NOMBRE" },
  { key: "lastname", label: "APELLIDO" },
  { key: "mail", label: "CORREO ELECTRÓNICO" },
  { key: "sex", label: "SEXO" },
  { key: "actions", label: "ACCIONES" },
];

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  async function fetchData(page: number) {
    try {
      const { data, totalPages } = await getUsers(page);
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
        onOpenChange();
        toast.success("Usuario eliminado correctamente");
      } catch (error) {
        console.error(error);
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
          <Button
            as={Link}
            startContent={<AddIcon />}
            color="primary"
            href="/dashboard/users/create"
          >
            Crear usuario
          </Button>
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
                        <Tooltip content="Actualizar usuario">
                          <Button
                            as={Link}
                            color="primary"
                            href={`/dashboard/users/${user.id}`}
                            radius="full"
                            variant="light"
                            startContent={<EditIcon className="w-5 h-5" />}
                          />
                        </Tooltip>
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={"blur"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmación de eliminación
              </ModalHeader>
              <ModalBody>
                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleDelete}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
