"use client"

import type React from "react"

import { updateUser, getUserById } from "@/app/lib/actions/users/user"
import { getCatalogSex } from "@/app/lib/actions/catalogs/catalogs"
import { toast } from "sonner"
import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Select, SelectItem, Card, CardHeader, Form } from "@heroui/react"

const initialState = {
  status: "",
  message: "",
  errors: {},
}

interface FormUpdateUserProps {
  idUser: string
}

export const FormUpdateUser: React.FC<FormUpdateUserProps> = ({ idUser }) => {
  const [state, formAction, pending] = useActionState((prevState, formData) => updateUser(idUser, prevState, formData), initialState)
  const [sexOptions, setSexOptions] = useState<{ id: number; name: string }[]>([])
  const [userData, setUserData] = useState({ name: "", lastname: "", mail: "", sexId: "" })
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const [sexOptions, userData] = await Promise.all([getCatalogSex(), getUserById(Number(idUser))])

        setSexOptions(sexOptions)
        console.log("User data fetched:", userData)
        setUserData(userData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Error al cargar los datos del usuario")
      }
    }

    fetchData()
  }, [idUser])

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message, {
        duration: 4000,
      })
      router.push("/dashboard/users")
    } else if (state.status === "error") {
      toast.error(state.message)
    }
  }, [state, router])

  return (
    <Card className="p-4 w-1/2">
      <CardHeader className="flex gap-3">
        <h2 className="text-lg font-semibold">Update User {idUser}</h2>
      </CardHeader>
      <Form className="flex flex-col gap-4 w-full" action={formAction}>
        <Input
          isRequired
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
        />
        {state.errors?.name && (
            <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
        )}
        <Input
          type="text"
          name="lastname"
          placeholder="Last Name"
          isRequired
          value={userData.lastname}
          onChange={(e) => setUserData((prev) => ({ ...prev, lastname: e.target.value }))}
        />
        {state.errors?.lastname && (
            <p className="text-red-500 text-xs mt-1"> {state.errors.lastname[0]} </p>
        )}
        <Input
          type="email"
          name="mail"
          placeholder="Email"
          isRequired
          value={userData.mail}
          onChange={(e) => setUserData((prev) => ({ ...prev, mail: e.target.value }))}
        />
        {state.errors?.mail && (
            <p className="text-red-500 text-xs mt-1">{state.errors.mail[0]}</p>
        )}
        <Select
          label="Sex"
          name="sexId"
          isRequired
          selectedKeys={[userData.sexId.toString()]}
          onSelectionChange={(keys) => setUserData((prev) => ({ ...prev, sexId: Array.from(keys)[0] as string }))}
        >
          {sexOptions.map((sex) => (
            <SelectItem key={sex.id} value={sex.id.toString()}>
              {sex.name}
            </SelectItem>
          ))}
        </Select>
        
        {state.errors?.sexId && (
            <p className="text-red-500 text-xs mt-1">{state.errors.sexId[0]}</p>
        )}

        <Button type="submit" isLoading={pending} color="primary" className="mt-4">
          {pending ? "Updating..." : "Update User"}
        </Button>
      </Form>
    </Card>
  )
}

