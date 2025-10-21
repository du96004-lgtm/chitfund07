
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { chitDetailsData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, Calendar, CheckCircle, Crown, Gavel } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function ChitDetailsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const chit = chitDetailsData['samruddhi-chit'];
  const memberImages = PlaceHolderImages.filter((p) =>
    p.id.startsWith('member-')
  );

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background/80 p-4 backdrop-blur-md">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-bold">{chit.name}</h1>
        <Badge
          variant={chit.status === 'Active' ? 'default' : 'secondary'}
          className="ml-auto border-green-500/30 bg-green-500/20 text-green-500"
        >
          {t(chit.status.toLowerCase())}
        </Badge>
      </header>

      <div className="flex-1 p-4 md:p-6">
        <div className="mb-6 grid grid-cols-3 gap-2 text-center">
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">{t('chit_value')}</p>
              <p className="text-lg font-bold">
                ₹{chit.chitValue.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">{t('installment')}</p>
              <p className="text-lg font-bold">
                ₹{chit.monthlyInstallment.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">{t('progress')}</p>
              <p className="text-lg font-bold">
                {chit.currentMonth}/{chit.totalMonths}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">{t('members')}</TabsTrigger>
            <TabsTrigger value="payments">{t('payments')}</TabsTrigger>
            <TabsTrigger value="dates">{t('dates')}</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="mt-4">
            <div className="flex flex-col gap-3">
              {chit.members.map((member, index) => {
                const avatar =
                  memberImages.find((img) => img.id === member.avatarId) ||
                  PlaceHolderImages.find((p) => p.id === 'user-avatar');
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg bg-card p-3 shadow-sm"
                  >
                    <Avatar className="h-10 w-10">
                      {avatar && (
                        <AvatarImage
                          src={avatar.imageUrl}
                          data-ai-hint={avatar.imageHint}
                        />
                      )}
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="flex-1 font-medium">{member.name}</p>
                    {member.isWinner && (
                      <Badge
                        variant="outline"
                        className="border-amber-400 text-amber-400"
                      >
                        <Crown className="mr-1 h-3 w-3" /> {t('auction_winner')}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y divide-border">
                  {chit.payments.map((payment, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-semibold">
                            ₹{payment.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {payment.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-500">
                          {t(payment.status.toLowerCase())}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {payment.transactionId}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dates" className="mt-4">
            <Card>
              <CardContent className="divide-y p-0">
                <div className="flex items-center gap-4 p-4">
                  <div className="rounded-full bg-secondary p-2">
                    <Calendar className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t('next_payment_due')}
                    </p>
                    <p className="font-semibold">{chit.dates.nextPayment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4">
                  <div className="rounded-full bg-secondary p-2">
                    <Gavel className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t('next_auction')}
                    </p>
                    <p className="font-semibold">{chit.dates.nextAuction}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="fixed bottom-20 left-1/2 w-full max-w-md -translate-x-1/2 p-4">
        <Button
          asChild
          size="lg"
          className="h-14 w-full bg-accent text-lg text-accent-foreground hover:bg-accent/90"
        >
          <Link href="/payment">
            {t('pay_installment')} ₹{chit.monthlyInstallment.toLocaleString()}
          </Link>
        </Button>
      </div>
    </div>
  );
}
