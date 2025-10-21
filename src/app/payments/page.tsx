
'use client';
import { History } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PaymentsPage() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 p-4 backdrop-blur-md">
        <h1 className="text-xl font-bold">{t('payments')}</h1>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="rounded-full bg-primary/10 p-4 text-primary">
          <History className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-semibold">{t('no_payment_history')}</h2>
        <p className="text-muted-foreground">
          {t('payment_history_message')}
        </p>
      </div>
    </div>
  );
}
