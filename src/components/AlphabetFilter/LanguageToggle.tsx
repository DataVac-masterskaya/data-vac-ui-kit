'use client';

import { cn } from '../../lib/utils';

type LanguageToggleProps = {
  language: 'ru' | 'en';
  onLanguageChange: (lang: 'ru' | 'en') => void;
};

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-0.5 bg-card rounded-full h-6 p-0.5">
      <button
        type="button"
        onClick={() => onLanguageChange('ru')}
        className={cn(
          'h-full rounded-full transition-colors',
          language === 'ru' && 'bg-neutral text-white',
          language !== 'ru' && 'text-fg hover:bg-subtle'
        )}
      >
        <span className="px-2 text-base rounded-full flex items-center h-full">
          RU
        </span>
      </button>
      <button
        type="button"
        onClick={() => onLanguageChange('en')}
        className={cn(
          'h-full rounded-full transition-colors',
          language === 'en' && 'bg-neutral text-white',
          language !== 'en' && 'text-fg hover:bg-subtle'
        )}
      >
        <span className="px-2 text-base rounded-full flex items-center h-full">
          EN
        </span>
      </button>
    </div>
  );
}
