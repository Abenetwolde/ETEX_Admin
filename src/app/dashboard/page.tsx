
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // const { userId } = await auth();
  const userId=121212

  if (!userId) {
    return redirect('/dashboard/overview');
  } else {
    redirect('/dashboard/overview');
  }
}
