
'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguagePage() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();

  const handleSaveChanges = () => {
    router.back();
  };

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background/80 p-4 backdrop-blur-md">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-bold">{t('language')}</h1>
      </header>

      <div className="flex-1 p-4 md:p-6">
        <RadioGroup
          defaultValue={language}
          onValueChange={(value: 'en' | 'te') => setLanguage(value)}
          className="space-y-4"
        >
          <Label
            htmlFor="english"
            className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
          >
            <span className="font-semibold">English</span>
            <RadioGroupItem value="en" id="english" />
          </Label>
          <Label
            htmlFor="telugu"
            className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
          >
            <span className="font-['Noto_Sans_Telugu'] font-semibold">
              తెలుగు
            </span>
            <RadioGroupItem value="te" id="telugu" />
          </Label>
        </RadioGroup>
      </div>

      <div className="mt-auto border-t p-4">
        <Button size="lg" className="w-full" onClick={handleSaveChanges}>
          {t('save_changes')}
        </Button>
      </div>
    </div>
  );
}
