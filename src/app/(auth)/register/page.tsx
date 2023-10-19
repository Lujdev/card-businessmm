import RegisterForm from '@/components/form/RegisterForm';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

const page = async () => {

  const session = await getServerSession();
  
  if(session){
    redirect("/")
  }

  return (
    <div className='w-full'>
      <RegisterForm />
    </div>
  );
};

export default page;
