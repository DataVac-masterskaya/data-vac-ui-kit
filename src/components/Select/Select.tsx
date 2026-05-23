import * as RadixSelect from '@radix-ui/react-select'
import { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { ChevronDownIcon } from '../../icons'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  icon?: ReactNode
  triggerClassName?: string
  contentClassName?: string
  viewportClassName?: string
  itemClassName?: string
}

export function Select({
  options,
  value,
  onChange,
  placeholder,
  icon,
  triggerClassName,
  contentClassName,
  viewportClassName,
  itemClassName,
}: SelectProps) {
  return (
    <RadixSelect.Root value={value} onValueChange={onChange}>
      <RadixSelect.Trigger
        className={cn(
          'flex gap-2 items-center px-4 py-3 group bg-card rounded-input w-82 text-fg text-[14px] leading-[1.3] focus-visible:outline-accent-hover focus-visible:outline-1',
          triggerClassName,
        )}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <div className="flex-1 min-w-0 text-start">
          <RadixSelect.Value placeholder={placeholder} />
        </div>
        <RadixSelect.Icon>
          <ChevronDownIcon className="transition-transform duration-500 group-data-[state=open]:rotate-180 shrink-0" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className={cn(
            'p-2 w-82 text-fg bg-card rounded-input shadow-[0px_2px_12px_rgb(0_0_0/0.08)]',
            contentClassName,
          )}
        >
          <RadixSelect.Viewport className={cn('flex flex-col gap-1', viewportClassName)}>
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  'px-2 py-2.25 text-[14px] leading-[1.3] rounded-sm data-[state=checked]:bg-page data-[highlighted]:outline-1 data-[highlighted]:outline-accent-hover data-[highlighted]:outline-offset-[-1px]',
                  itemClassName,
                )}
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
