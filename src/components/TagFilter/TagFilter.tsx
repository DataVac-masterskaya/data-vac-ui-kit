'use client';

import { cn } from '../../lib/utils';
import { Chip } from '../Badge/Badge';

export type TagFilterProps = {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
  className?: string;
  highlighted?: string[];
};

const getChipClassName = (active: string | null, tag: string, highlighted?: string[]): string => {
  const isActive = active === tag;
  const isHighlighted = highlighted?.includes(tag) ?? false;

  if (isActive) {
    return 'bg-[#4F5153] text-white';
  }
  if (isHighlighted) {
    return 'bg-white text-[#E30C5C]';
  }
  return 'bg-white text-[#323335]';
};

export function TagFilter({ tags, active, onChange, className, highlighted = [] }: TagFilterProps) {
  const handleClick = (tag: string) => {
    if (active === tag) {
      onChange(null);
    } else {
      onChange(tag);
    }
  };

  return (
    <div className={cn('flex gap-2 flex-wrap', className)}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          onClick={() => handleClick(tag)}
          aria-pressed={active === tag}
          className={getChipClassName(active, tag, highlighted)}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
}