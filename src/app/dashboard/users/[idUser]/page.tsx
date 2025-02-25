import { LayoutPage } from "@/app/ui/components/LayoutPage";
import { FormUpdateUser } from "@/app/ui/users/form-update-user";

type Props = {
  params: Promise<{ idUser: string }>;
};

export default async function Page({ params }: Props) {
  const { idUser } = await params;

  return (
    <LayoutPage>
      <div className="w-full flex justify-center">
        <FormUpdateUser idUser={idUser} />
      </div>
    </LayoutPage>
  );
}
