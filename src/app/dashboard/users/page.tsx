import UserTable from "@/app/ui/users/UserTable"
import { LayoutPage } from "@/app/ui/components/LayoutPage"
import { Button, Link } from "@heroui/react"
import SvgAdd  from "@/app/ui/svg/add"

export default function page() {
    return (
        <LayoutPage>
          <div className="w-full flex justify-between">
            <h1>Usuarios</h1>
            <Button
              startContent={<SvgAdd />}
              as={Link}
              color="primary"
              href="/dashboard/users/new-user"
              variant="solid"
            >
              Nuevo
            </Button>
          </div>
          <UserTable />
        </LayoutPage>
    )
}