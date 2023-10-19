import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CardForm from "@/components/card/CardForm";

export default async function Home() {
  const prisma = new PrismaClient();
  const session = await getServerSession();

  if (session) {
    const profile = await prisma.profile.findUnique({
      where: { email: session?.user?.email! },
    });
    return (
      <div className='w-full'> 
      <CardForm profile={profile} />
    </div>
    )
  }
  return <>No esta logeado, por favor click al botton acceder.</>;
}
