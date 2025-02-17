import { LayoutPage } from "@/app/ui/components/LayoutPage";
import FormAddUser from "@/app/ui/users/form-add-user"

export default function page() {
  return (
    <LayoutPage>
      <div className="w-full flex justify-center">
        <FormAddUser />
      </div>
    </LayoutPage>
  )
} 