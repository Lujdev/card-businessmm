import LoginForm from '@/components/form/LoginForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async ()  => {
  const session = await getServerSession();
  
  if(session){
    redirect("/")
  }

  return (
    <div className='w-full'>
      <LoginForm />
    </div>
  );
  
};

export default page;
