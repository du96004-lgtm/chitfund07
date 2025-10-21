
'use client';

import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const publicRoutes = ['/login'];

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null && !publicRoutes.includes(pathname)) {
      router.replace('/login');
    } else if (user && publicRoutes.includes(pathname)) {
      router.replace('/');
    }
  }, [user, router, pathname]);

  if (user === undefined) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If user is not logged in and not on a public route, show nothing until redirect happens.
  if (user === null && !publicRoutes.includes(pathname)) {
     return (
      <div className="flex h-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If user is logged in and on a public route, show nothing until redirect happens.
  if (user && publicRoutes.includes(pathname)) {
     return (
      <div className="flex h-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }


  return <>{children}</>;
}
