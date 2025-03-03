import UserTable from "@/app/ui/users/user-table"
import { LayoutPage } from "@/app/ui/components/LayoutPage"

export default function page() {
    return (
        <LayoutPage>
          <UserTable />
        </LayoutPage>
    )
}