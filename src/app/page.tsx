
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { activeChits, upcomingPayments } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Plus, IndianRupee, Languages } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useUser } from '@/firebase';

export default function DashboardPage() {
  const user = useUser();
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between p-4 md:p-6">
        <h1 className="text-2xl font-bold text-foreground">
          {t('hello')}, {user?.displayName || 'User'}!
        </h1>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile/language">
              <Languages className="h-6 w-6" />
            </Link>
          </Button>
          <Avatar className="h-10 w-10 border-2 border-primary">
            {user?.photoURL ? (
              <AvatarImage src={user.photoURL} alt={user.displayName || ''} />
            ) : (
              userAvatar && (
                <AvatarImage
                  src={userAvatar.imageUrl}
                  alt={'User Avatar'}
                  data-ai-hint={userAvatar.imageHint}
                />
              )
            )}
            <AvatarFallback>
              {user?.displayName?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="space-y-6 p-4 pt-0 md:p-6 md:pt-0">
        <section className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('total_contribution')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹4,15,000</div>
              <p className="flex items-center text-xs text-green-600 dark:text-green-400">
                +5%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('potential_payout')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹8,30,000</div>
              <p className="text-xs text-green-600 dark:text-green-400">
                +2%
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">
              {t('next_payment_due')}
            </p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold">15 July</p>
              <p className="font-semibold text-muted-foreground">₹20,750</p>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">{t('active_chits')}</h2>
          <div className="flex snap-x snap-mandatory space-x-4 overflow-x-auto pb-2">
            {activeChits.map((chit) => (
              <Card
                key={chit.id}
                className="w-3/4 min-w-[250px] snap-start overflow-hidden"
              >
                <CardContent className="p-3">
                  <Link href={`/chits/${chit.id}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{chit.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {chit.members} {t('members')}
                        </p>
                      </div>
                      {chit.imageUrl && (
                        <Image
                          src={chit.imageUrl}
                          alt={chit.name}
                          width={48}
                          height={48}
                          className="rounded-md"
                          data-ai-hint="abstract pattern"
                        />
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-sm">
                        <span className="text-muted-foreground">
                          {t('contribution')}:{' '}
                        </span>
                        <span className="font-semibold">
                          ₹{chit.contribution.toLocaleString()}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">
                          {t('pot_value')}:{' '}
                        </span>
                        <span className="font-semibold">
                          ₹{chit.potValue.toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <Progress
                      value={(chit.currentCycle / chit.totalCycles) * 100}
                      className="mt-3 h-2"
                    />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <h2 className="mb-3 text-lg font-semibold">
            {t('upcoming_payments')}
          </h2>
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {upcomingPayments.slice(0, 1).map((payment, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3"
                  >
                    <div className="flex flex-1 items-center gap-3">
                      <div className="rounded-full bg-secondary p-2">
                        <IndianRupee className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">{payment.chitName}</p>
                        <p className="text-sm text-muted-foreground">
                          {t('due')}: {payment.dueDate}
                        </p>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href="/payment">
                        {t('pay')} ₹{payment.amount.toLocaleString()}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <div className="fixed bottom-24 right-6 z-40 sm:bottom-[calc(5vh+1rem)] sm:right-[calc(50%-12rem)]">
          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700"
          >
            <Plus className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}
