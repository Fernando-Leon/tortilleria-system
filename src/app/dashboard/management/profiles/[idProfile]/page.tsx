import { LayoutPage } from "@/app/ui/components/LayoutPage";
import { FormUpdateProfile } from "@/app/ui/profile/update-profile-form";

type Props = {
  params: Promise<{ idProfile: string }>;
};

export default async function Page({ params }: Props) {
  const { idProfile: idProfile } = await params;

  return (
    <LayoutPage>
      <div className="w-full flex justify-center">
        <FormUpdateProfile idprofile={idProfile} />
      </div>
    </LayoutPage>
  );
}
