
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Banknote,
  Bell,
  ChevronRight,
  HelpCircle,
  Languages,
  ArrowLeft,
  Lock,
  LogOut,
  ShieldCheck,
  User as UserIcon,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

export default function ProfilePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const user = useUser();
  const auth = useAuth();
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      // It's a good practice to redirect the user to the login page after logout.
      router.push('/login');
    }
  };

  const profileLinks = [
    { label: t('personal_information'), icon: UserIcon, href: '#' },
    { label: t('bank_details'), icon: Banknote, href: '#' },
    {
      label: t('link_aadhaar_pan'),
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
        </svg>
      ),
      href: '#',
    },
  ];

  const settingsLinks = [
    { label: t('language'), icon: Languages, href: '/profile/language' },
    { label: t('notifications'), icon: Bell, href: '#' },
    { label: t('app_lock'), icon: Lock, href: '#' },
  ];

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background/80 p-4 backdrop-blur-md">
        <h1 className="text-xl font-bold">{t('profile')} &amp; {t('settings')}</h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center gap-4 p-6 text-center">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            {user?.photoURL ? (
              <AvatarImage src={user.photoURL} alt={user.displayName || 'user avatar'} />
            ) : (
              userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="user avatar" />
            )}
            <AvatarFallback className="text-3xl">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user?.displayName}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          <div className="mt-2 grid w-full grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="h-12">
              <FileText className="mr-2 h-4 w-4" /> {t('edit_profile')}
            </Button>
            <Button size="lg" className="h-12">
              <ShieldCheck className="mr-2 h-4 w-4" /> {t('view_kyc')}
            </Button>
          </div>
        </div>

        <div className="space-y-6 px-4 pb-8">
          <div>
            <h2 className="mb-2 px-2 text-sm font-semibold uppercase text-muted-foreground">
              {t('account')}
            </h2>
            <div className="rounded-lg bg-card text-card-foreground shadow-sm">
              <ul className="divide-y divide-border">
                {profileLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary/50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon />
                      </div>
                      <span className="flex-1 font-medium">{item.label}</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="mb-2 px-2 text-sm font-semibold uppercase text-muted-foreground">
              {t('settings')}
            </h2>
            <div className="rounded-lg bg-card text-card-foreground shadow-sm">
              <ul className="divide-y divide-border">
                {settingsLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary/50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <span className="flex-1 font-medium">{item.label}</span>
                      {item.href === '/profile/language' && (
                        <span className="text-sm text-muted-foreground">
                          English
                        </span>
                      )}
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <HelpCircle className="h-6 w-6" />
                    </div>
                    <span className="flex-1 font-medium">
                      {t('help_and_support')}
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t('logout')}
          </Button>

          <div className="flex items-center justify-center gap-2 px-4 text-center text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            <span>{t('data_secure_message')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
