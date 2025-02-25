import { LayoutPage } from "@/app/ui/components/LayoutPage";
import { FormUpdateUser } from "@/app/ui/users/form-update-user";

type Params = {
  idUser: string;
};

type PageProps = {
  params: Params;
};

export default function Page({ params }: PageProps) {
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
