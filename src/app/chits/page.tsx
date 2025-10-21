
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { communityChits } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Filter, Search, PiggyBank } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const newChits = [
  {
    amount: 500000,
    formattedAmount: '5 Lakhs',
  },
  {
    amount: 1000000,
    formattedAmount: '10 Lakhs',
  },
  {
    amount: 2500000,
    formattedAmount: '25 Lakhs',
  },
  {
    amount: 5000000,
    formattedAmount: '50 Lakhs',
  },
];

export default function ChitsPage() {
  const emptyStateImage = PlaceHolderImages.find((p) => p.id === 'empty-chits');
  const { t } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 p-4 backdrop-blur-md">
        <h1 className="text-xl font-bold">{t('chit_groups')}</h1>
      </header>
      <div className="flex-1 p-4 md:p-6">
        <Tabs defaultValue="join" className="flex h-full flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">{t('new_chits')}</TabsTrigger>
            <TabsTrigger value="join">{t('join_chit')}</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="flex-1 pt-4">
            <div className="grid grid-cols-2 gap-4">
              {newChits.map((chit) => (
                <Card key={chit.amount}>
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                    <div className="mb-2 rounded-full bg-primary/10 p-3 text-primary">
                      <PiggyBank className="h-6 w-6" />
                    </div>
                    <p className="text-lg font-bold">
                      ₹{chit.formattedAmount}
                    </p>
                    <p className="mb-3 text-xs text-muted-foreground">
                      {t('chit_value')}
                    </p>
                    <Button size="sm">{t('start_chit')}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="join" className="flex-1">
            <div className="mb-4 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder={t('search_chits')} className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-5 w-5" />
              </Button>
            </div>

            {communityChits.length > 0 ? (
              <div className="flex flex-col gap-4">
                {communityChits.map((chit) => (
                  <Card key={chit.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-bold">{chit.name}</h3>
                        <p className="font-bold text-primary">
                          ₹{chit.amount.toLocaleString()}
                        </p>
                      </div>
                      <div className="mb-3 text-sm text-muted-foreground">
                        by {chit.admin}
                      </div>

                      <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t('duration')}
                          </p>
                          <p className="font-semibold">{chit.duration} {t('months')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t('monthly')}
                          </p>
                          <p className="font-semibold">
                            ₹{chit.contribution.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t('members')}
                          </p>
                          <p className="font-semibold">
                            {chit.members}/{chit.maxMembers}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/chits/samruddhi-chit">{t('view_details')}</Link>
                        </Button>
                        <Button className="w-full">{t('request_to_join')}</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 text-center">
                {emptyStateImage && (
                  <Image
                    src={emptyStateImage.imageUrl}
                    alt="No chits"
                    width={200}
                    height={150}
                    className="rounded-lg"
                    data-ai-hint={emptyStateImage.imageHint}
                  />
                )}
                <h2 className="text-xl font-semibold">{t('no_chits_available')}</h2>
                <p className="text-muted-foreground">
                  {t('no_chits_message')}
                </p>
                <Button>{t('create_a_new_chit')}</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
