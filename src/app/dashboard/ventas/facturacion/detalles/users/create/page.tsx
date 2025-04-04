import { LayoutPage } from "@/app/ui/components/LayoutPage";
import NewUserForm from "@/app/ui/users/create-user-form"

export default function page() {
  return (
    <LayoutPage>
      <div className="w-full flex justify-center">
        <NewUserForm />
      </div>
    </LayoutPage>
  )
} 