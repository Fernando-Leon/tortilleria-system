import { LayoutPage } from "@/app/ui/components/LayoutPage";
import { FormUpdateUser } from "@/app/ui/users/form-update-user";

export default function Page({ params }: { params: { idUser: string } }) {
  const { idUser } = params;

  if (!idUser) {
    return <p>Error: El ID del usuario no está definido.</p>;
  }

  return (
    <LayoutPage>
      <div className="w-full flex justify-center">
        <FormUpdateUser idUser={idUser} />
      </div>
    </LayoutPage>
  );
}
