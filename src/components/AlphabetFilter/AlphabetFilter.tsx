'use client';

import { cn } from '../../lib/utils';

export type AlphabetFilterProps = {
  letters: string[];
  active: string | null;
  onChange: (letter: string | null) => void;
  disabled?: string[];
  className?: string;
};

const getButtonClassName = (isActive: boolean, isDisabled: boolean): string => {
  if (isActive) {
    return 'bg-accent text-white';
  }
  if (isDisabled) {
    return 'bg-card text-fg-muted cursor-default';
  }
  return 'bg-card text-fg hover:bg-subtle';
};

export function AlphabetFilter({
  letters,
  active,
  onChange,
  disabled = [],
  className,
}: AlphabetFilterProps) {
  const handleClick = (letter: string) => {
    const isDisabled = disabled.includes(letter);
    if (isDisabled) return;

    if (active === letter) {
      onChange(null);
    } else {
      onChange(letter);
    }
  };

  return (
    <div className={cn('flex gap-0.5', className)}>
      {letters.map((letter) => {
        const isActive = active === letter;
        const isDisabled = disabled.includes(letter);

        return (
          <button
            key={letter}
            onClick={() => handleClick(letter)}
            disabled={isDisabled}
            className={cn(
              'w-6 h-6 rounded-xl text-base font-normal flex items-center justify-center',
              getButtonClassName(isActive, isDisabled)
            )}
            aria-pressed={isActive}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
