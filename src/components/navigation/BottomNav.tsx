
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReceiptText, PiggyBank, LayoutGrid, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

const navItems = [
  { href: '/', labelKey: 'dashboard', icon: LayoutGrid },
  { href: '/chits', labelKey: 'chits', icon: PiggyBank },
  { href: '/payments', labelKey: 'payments', icon: ReceiptText },
  { href: '/profile', labelKey: 'profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 h-20 w-full max-w-md -translate-x-1/2 border-t bg-background/80 backdrop-blur-md sm:bottom-[calc(5vh-1px)] sm:rounded-b-2xl">
      <div className="grid h-full grid-cols-4">
        {navItems.map((item) => {
          const isActive =
            (pathname === '/' && item.href === '/') ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.labelKey}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span>{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
