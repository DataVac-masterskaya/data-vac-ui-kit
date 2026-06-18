'use client';

import { cn } from '../../lib/utils';
import { useMemo } from 'react';
import { LanguageToggle } from './LanguageToggle';

export type AlphabetFilterProps = {
  letters: string[];
  active: string | null;
  onChange: (letter: string | null) => void;
  disabled?: string[];
  language?: 'ru' | 'en';
  onLanguageChange?: (lang: 'ru' | 'en') => void;
  className?: string;
};

export function AlphabetFilter({
  letters,
  active,
  onChange,
  disabled = [],
  language,
  onLanguageChange,
  className,
}: AlphabetFilterProps) {
  const disabledSet = useMemo(() => new Set(disabled), [disabled]);

  const handleClick = (letter: string, isDisabled: boolean) => {
    if (isDisabled) return;
    onChange(active === letter ? null : letter);
  };

  const showLanguageToggle = language && onLanguageChange;

  return (
    <div className={cn('flex items-center', className)}>
      {showLanguageToggle && (
        <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
      )}
      <div className="flex flex-wrap items-center gap-0.5 ml-6">
        {letters.map((letter) => {
          const isDisabled = disabledSet.has(letter);
          const isActive = active === letter && !isDisabled;

          return (
            <button
              type="button"
              key={letter}
              onClick={() => handleClick(letter, isDisabled)}
              disabled={isDisabled}
              className={cn(
                'w-6 h-6 rounded-input text-base font-normal flex items-center justify-center transition-colors',
                isActive && 'bg-accent text-white',
                !isActive && !isDisabled && 'bg-card text-fg hover:bg-subtle',
                isDisabled && 'bg-card text-fg-muted cursor-default'
              )}
              aria-pressed={isActive}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
