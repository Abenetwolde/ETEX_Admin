'use client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { useLoginAdminMutation } from '@/Apis/users';
import Image from 'next/image';
import { setToken } from '@/Apis/states/admin-slice';
export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage({ stars }: { stars: number }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const credentials = {
      name: formData.get("name") as string,
      phone_number: formData.get("phone_number") as string,
      password: formData.get("password") as string,
    };

    const loadingToast = toast.loading('Logging in...');
    try {
      const response = await loginAdmin(credentials).unwrap();
      dispatch(setToken(response?.auth_token));
      toast.dismiss(loadingToast);
      toast.success('Login successful!');
      router.push('/dashboard/overview');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Login failed. Please check your credentials.');
    }
  };
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/auth/sign-in'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        Login
      </Link>
      <div className='bg-muted relative hidden h-full flex-col justify-between p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium '>
          <Image
            src="/logo_bg_remove.png"
            alt="Logo"
            width={100}
            height={50}
            className="object-contain "
          />
        </div>
        <div className='relative z-20 text-center flex flex-col items-center justify-between'>
          <Image
            src="/banner.png"
            alt="Bottom Image"
            width={400}
            height={200}
            className="w-full object-cover rounded-md p-4 flex-1"
          />
          <div className='text-center'>
            <p className='text-muted-foreground px-8 mt-20 italic'>
              “We have made significant strides as a nation since embarking on our digital journey. To thrive in the digital economy, we must support innovators and build strong digital enablers. We aim to position Ethiopia as a leader in Africa’s digital economy, encouraging global partnerships and empowering our youth to drive the digital revolution.”
            </p>
            <p className='text-muted-foreground mt-2 font-semibold'>
              H.E. Abiy Ahmed (PhD)
            </p>
          </div>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <Card className='w-full max-w-md shadow-md'>
          <CardHeader className='text-center'>
            <Link
              className={cn('group inline-flex hover:text-yellow-200 flex justify-center')}
              target='_blank'
              href={'https://github.com/kiranism/next-shadcn-dashboard-starter'}
            >
              ETEX quiz admin login
            </Link>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='admin'
                  defaultValue='admin2'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone_number'>Phone Number</Label>
                <Input
                  id='phone_number'
                  name='phone_number'
                  type='tel'
                  placeholder='Enter your phone number'
                  defaultValue='2222222222'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Enter your password'
                  defaultValue='admin2'
                  required
                />
              </div>
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className='text-center'>
            <p className='text-muted-foreground px-8 text-sm'>
              By clicking continue, you agree to our{' '}
              <Link
                href='/terms'
                className='hover:text-primary underline underline-offset-4'
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href='/privacy'
                className='hover:text-primary underline underline-offset-4'
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
