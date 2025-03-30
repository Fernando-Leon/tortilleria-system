import { LayoutPage } from "@/app/ui/components/LayoutPage";
import NewProfileForm from "@/app/ui/profile/create-profile-form"

export default function page() {
  return (
    <LayoutPage>
      <div className="w-full flex justify-center">
        <NewProfileForm />
      </div>
    </LayoutPage>
  )
} 