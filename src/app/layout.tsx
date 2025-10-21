
'use client';

import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import AuthGate from '@/components/auth/AuthGate';
import { FirebaseProvider } from '@/firebase/provider';
import BottomNav from '@/components/navigation/BottomNav';
import { usePathname } from 'next/navigation';

const noNavRoutes = ['/login'];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNav = !noNavRoutes.includes(pathname);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Telugu:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <FirebaseProvider>
            <div className="flex min-h-screen w-full items-start justify-center bg-neutral-100 dark:bg-neutral-900 sm:items-center">
              <div className="relative flex h-screen w-full max-w-md flex-col bg-background shadow-2xl sm:h-[90vh] sm:max-h-[800px] sm:rounded-2xl">
                <AuthGate>
                  <main className="flex-1 overflow-y-auto pb-20">{children}</main>
                  {showNav && <BottomNav />}
                </AuthGate>
                <Toaster />
              </div>
            </div>
          </FirebaseProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
