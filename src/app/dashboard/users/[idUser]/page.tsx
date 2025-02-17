import { LayoutPage } from "@/app/ui/components/LayoutPage";
import { FormUpdateUser } from "@/app/ui/users/form-update-user";

interface PageProps {
  params: {
    idUser: string;
  };
}

export default function Page({ params }: PageProps) {
  const { idUser } = params;

  return (
    <LayoutPage>
      <div className="w-full flex justify-center">
        <FormUpdateUser idUser={idUser} />
      </div>
    </LayoutPage>
  );
}