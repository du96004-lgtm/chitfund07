
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ArrowLeft,
  Landmark,
  Languages,
  ShieldCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

const UpiIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.88 12.872H4.256v4.344H2V7.128h5.36c1.24 0 2.296.264 3.168.792.88.528 1.32 1.328 1.32 2.4.013 1.053-.415 1.864-1.264 2.424-.848.56-1.904.824-3.168.824Zm-.464-1.872c.64 0 1.144-.168 1.512-.504.376-.336.568-.8.568-1.392 0-.584-.192-1.04-.576-1.368-.384-.328-.888-.496-1.512-.496H4.256v3.76h2.16Z"
      fill="#53A653"
    />
    <path
      d="M21.928 7.128h-2.12v4.832c0 .947-.28 1.632-.84 2.056-.56.424-1.312.632-2.256.632-.96 0-1.712-.2-2.256-.6-.544-.4-.816-1.08-.816-2.04V7.128h-2.12v4.848c0 1.253.416 2.24 1.248 2.96.832.72 1.928 1.08 3.288 1.08s2.464-.352 3.296-1.056c.832-.704 1.248-1.696 1.248-2.976V7.128Z"
      fill="#F5862A"
    />
  </svg>
);

const VisaIcon = () => (
  <svg
    width="24"
    height="15"
    viewBox="0 0 24 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4"
  >
    <path
      d="M9.193 14.512l-3.32-14.12H9.28l3.32 14.12H9.194zM23.94 5.344c.066.85-.308 1.485-1.122 1.892-.814.407-2.068.748-3.762.748-1.33 0-2.518-.165-3.563-.495V6.37c1.034.429 2.453.649 4.257.649.924 0 1.551-.11 1.881-.33.33-.22.495-.539.495-.946 0-.253-.055-.473-.165-.66-.11-.187-.33-.352-.66-.495l-3.08-.99C6.01 4.14 5.21 3.515 5.21 2.37c0-1.122.957-1.848 2.86-1.848 1.243 0 2.255.154 3.025.451l.594 1.936c-.847-.319-1.925-.473-3.245-.473-.78 0-1.275.11-1.506.33-.231.22-.346.473-.346.759 0 .528.539.869 1.595 1.21l3.08.99c1.617.484 2.425 1.155 2.425 2.013zM2.897 1.118C2.15 1.547.455 2.437.455 4.186c0 1.342.66 2.464 1.77 3.19l-1.98 5.748H3.8l1.98-5.874c.99.286 2.21.418 3.651.418.066 0 .121-.011.165-.011L9.193 0H5.735c-1.023 0-1.87.33-2.54.809L2.897 1.118z"
      fill="#1A1F71"
    />
  </svg>
);

const MastercardIcon = () => (
  <svg
    width="24"
    height="15"
    viewBox="0 0 24 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4"
  >
    <path
      d="M9.629 7.481a4.57 4.57 0 01-4.572-4.572A4.57 4.57 0 019.63 2.91a4.57 4.57 0 000 9.143v-.001a4.57 4.57 0 000-9.142 4.57 4.57 0 010 9.142z"
      fill="#EB001B"
    />
    <path
      d="M19.198 7.481a4.571 4.571 0 01-8.57-2.016 4.57 4.57 0 100 4.031 4.571 4.571 0 018.57-2.015z"
      fill="#F79E1B"
    />
  </svg>
);

const RupayIcon = () => (
  <svg
    width="24"
    height="15"
    viewBox="0 0 24 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4"
  >
    <path
      d="M3.733 9.208l-.348 1.167h5.176l-.422-1.167h-4.4zM23.11 0H7.558l-5.02 14.618h3.336l.72-2.19h5.15l-.837 2.19h3.32l5.02-14.618H23.11zM9.41 7.842l-1.4 4.032h-.058L6.56 7.842l2.85-.015z"
      fill="#E56A2B"
    />
    <path
      d="M20.25 5.56l.334 1.12H15.4l.437-1.12h4.415zM8.349 5.56H4.282L3.109 9.223l-.116-.014c.044-.1.088-.21.116-.32l1.6-4.504h3.64zM23.633 3.998l-1.586 4.49-1.2-4.148h-3.61l-1.6 5.516L17.11 3.97h3.394l-.748 2.19h-1.92l1.372 4.004h.058l1.4-4.004h.247l.836 2.896.791-2.896H23.63z"
      fill="#01529D"
    />
  </svg>
);

export default function PaymentPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [amount, setAmount] = useState('40,000.00');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const formatAmount = (value: string) => {
    try {
      const numberValue = parseFloat(value.replace(/,/g, ''));
      if (isNaN(numberValue)) return '';
      return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numberValue);
    } catch (error) {
      return value;
    }
  };

  const getPayableAmount = () => {
    try {
      const numberValue = parseFloat(amount.replace(/,/g, ''));
      if (isNaN(numberValue)) return '0.00';
      return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numberValue);
    } catch {
      return '0.00';
    }
  };

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background/80 p-4 backdrop-blur-md">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="flex-1 text-lg font-semibold">
          {t('pay_monthly_contribution')}
        </h1>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile/language">
            <Languages className="h-5 w-5" />
          </Link>
        </Button>
      </header>

      <div className="flex-1 space-y-6 p-4 md:p-6">
        <Card className="shadow-none">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-primary">
              {t('chit_details')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-4 pt-0">
            <h3 className="text-lg font-bold">Fortune 500 Chit</h3>
            <p className="text-muted-foreground">Group ID: CHIT-123</p>
            <p className="text-muted-foreground">
              {t('amount_due')}: ₹40,000.00
            </p>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Label htmlFor="amount" className="px-1 text-base">
            {t('payment_amount')}
          </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">
              ₹
            </span>
            <Input
              id="amount"
              type="text"
              value={formatAmount(amount)}
              onChange={handleAmountChange}
              className="h-12 rounded-lg border-gray-300 bg-white pl-8 text-lg font-semibold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="px-1 text-base">{t('select_payment_method')}</Label>
          <RadioGroup defaultValue="upi" className="space-y-3">
            <Label className="flex cursor-pointer items-center gap-4 rounded-lg border border-gray-300 bg-white p-4 has-[input:checked]:border-primary has-[input:checked]:ring-1 has-[input:checked]:ring-primary">
              <RadioGroupItem value="upi" id="upi" />
              <UpiIcon />
              <p className="font-semibold">UPI</p>
            </Label>
            <Label className="flex cursor-pointer items-center gap-4 rounded-lg border border-gray-300 bg-white p-4 has-[input:checked]:border-primary has-[input:checked]:ring-1 has-[input:checked]:ring-primary">
              <RadioGroupItem value="netbanking" id="netbanking" />
              <Landmark className="h-6 w-6 text-muted-foreground" />
              <p className="font-semibold">{t('net_banking')}</p>
            </Label>
            <Label className="flex cursor-pointer items-center gap-4 rounded-lg border border-gray-300 bg-white p-4 has-[input:checked]:border-primary has-[input:checked]:ring-1 has-[input:checked]:ring-primary">
              <RadioGroupItem value="card" id="card" />
              <div className="flex items-center gap-2">
                <VisaIcon />
                <MastercardIcon />
                <RupayIcon />
              </div>
              <p className="font-semibold">{t('debit_credit_card')}</p>
            </Label>
          </RadioGroup>
        </div>
      </div>

      <div className="mt-auto border-t bg-white p-4">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span>{t('payment_secured_message')}</span>
        </div>
        <Button size="lg" className="h-12 w-full text-lg">
          {t('pay_securely')} ₹{getPayableAmount()}
        </Button>
      </div>
    </div>
  );
}
