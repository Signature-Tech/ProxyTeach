import { auth } from '@/auth';
import Form from './Form'
import { redirect } from 'next/navigation';

export default async function SignInPage() {

  const session = await auth();

  if (session?.user) {
    redirect('/')
  }
  return (
    <div>
      <Form />
    </div>
  )
}
