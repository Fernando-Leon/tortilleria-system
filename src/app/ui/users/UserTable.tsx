'use client';
import React, { useState, useEffect } from 'react';
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
} from '@heroui/react';
import { getUsers, deleteUser } from '@/app/lib/actions/users/user';
import { EditIcon, DeleteIcon } from '@/app/ui/svg/icons';
import { toast } from 'sonner';
import Link from 'next/link';
// Definir la interfaz para el tipo User
interface User {
  id: string; // O el tipo correspondiente si es diferente
  name: string;
  lastname: string;
  mail: string;
  sex: string;
}

const columns = [
  { key: 'name', label: 'NOMBRE' },
  { key: 'lastname', label: 'APELLIDO' },
  { key: 'mail', label: 'CORREO ELECTRÓNICO' },
  { key: 'sex', label: 'SEXO' },
  { key: 'actions', label: 'ACCIONES' },
];

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]); // Tipo User[]
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null); // Estado para almacenar el ID del usuario a eliminar

  useEffect(() => {
    async function fetchData() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (userIdToDelete) {
      try {
        await deleteUser(parseInt(userIdToDelete));
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete));
        onOpenChange();
        toast.success('Usuario eliminado correctamente');
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error('An unexpected error occurred');
        }
      }
    }
  };

  return (
    <>
      <Table aria-label="Tabla de usuarios">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === 'actions' ? (
                    <div className="relative flex items-center gap-2">
                      <Tooltip content="Actualizar usuario">
                        <Button as={Link} color='primary' href={`/dashboard/users/${user.id}`} startContent={ <EditIcon /> }>
                          Actualizar
                        </Button>
                      </Tooltip>
                      <Tooltip color="danger" content="Eliminar usuario">
                        <Button
                          className="flex"
                          color='danger'
                          onPress={() => {
                            setUserIdToDelete(user.id); // Establecer el ID del usuario a eliminar
                            onOpen(); // Abrir el modal de confirmación
                          }}
                          startContent={<DeleteIcon />}
                        >
                          Eliminar
                        </Button>
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

      {/* Modal de confirmación */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={'blur'}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirmación de eliminación</ModalHeader>
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
