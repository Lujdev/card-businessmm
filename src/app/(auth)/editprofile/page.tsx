import EditProfileForm from "@/components/form/EditProfileForm";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const prisma = new PrismaClient();
  const session = await getServerSession();

  if (session) {
    const profile = await prisma.profile.findUnique({
      where: { email: session?.user?.email! },
    });
    return (
      <div className='w-full'> 
      <EditProfileForm profile={profile} />
    </div>
    )
  } else {
    redirect("/")
  }
};

export default page;
