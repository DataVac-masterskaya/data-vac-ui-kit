'use client';

import { cn } from '../../lib/utils';
import { Chip } from '../Badge/Badge';

export type TagFilterProps = {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
  className?: string;
};

const getChipClassName = (active: string | null, tag: string): string => {
  const isActive = active === tag;
  if (isActive) {
    return 'bg-[#4F5153] text-white hover:bg-[#4F5153]';
  }
  return 'bg-white text-[#323335] hover:text-[#E30C5C] hover:bg-white';
};

export function TagFilter({ tags, active, onChange, className }: TagFilterProps) {
  const handleClick = (tag: string) => {
    if (active === tag) {
      onChange(null);
    } else {
      onChange(tag);
    }
  };

  return (
    <div className={cn('flex gap-2 overflow-x-auto', className)}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          onClick={() => handleClick(tag)}
          aria-pressed={active === tag}
          className={getChipClassName(active, tag)}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
}