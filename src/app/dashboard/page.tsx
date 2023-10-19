
import { getServerSession } from "next-auth"

export default async function DashboardPage(){
    
    const session = await getServerSession();

    if (session) {
    return (
      <>
        Logeado {session.user?.email} <br />
        <button >Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button >Sign in</button>
    </>
  )
};