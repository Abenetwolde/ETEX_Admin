'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/Apis/store';
export default async function Page() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.admin.token);
console.log(token, 'token');
  // Check if the token exists in local storage or Redux store                                    
  useEffect(() => {
    if (token) {
      // Token exists, redirect to dashboard
      router.push('/dashboard/overview');
    } else {
      // No token, redirect to sign-in page
      router.push('/auth/sign-in');
    }
  }, [token, router]);

  // Render nothing while redirecting
  return null;
}