import * as RadixAccordion from '@radix-ui/react-accordion'
import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface AccordionProps {
  children: ReactNode
  className?: string
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <RadixAccordion.Root type="multiple" className={cn('flex flex-col gap-3', className)}>
      {children}
    </RadixAccordion.Root>
  )
}

interface AccordionItemProps {
  title: string
  children: ReactNode
  value?: string
  className?: string
  titleClassName?: string
  iconClassName?: string
  contentClassName?: string
}

export function AccordionItem({
  title,
  children,
  value,
  className,
  titleClassName,
  iconClassName,
  contentClassName,
}: AccordionItemProps) {
  return (
    <RadixAccordion.Item value={value ?? title} className={className}>
      <RadixAccordion.Header>
        <RadixAccordion.Trigger
          className={cn(
            'flex w-full items-center justify-between gap-3 py-1 font-semibold text-base text-fg font-sans group',
            titleClassName,
          )}
        >
          <span>{title}</span>
          {/* + → − анимация: вертикальная полоса поворачивается на 90° и ложится на горизонтальную */}
          <span
            className={cn(
              'relative flex-shrink-0 w-4 h-4 text-fg-secondary group-data-[state=open]:text-fg-secondary',
              iconClassName,
            )}
          >
            <span className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-current rounded-full" />
            <span className="absolute top-1/2 left-1/2 w-full h-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current rounded-full origin-center transition-transform duration-300 rotate-90 group-data-[state=open]:rotate-0" />
          </span>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className={cn('pt-2 pb-1 font-sans text-base text-fg leading-5', contentClassName)}>
          {children}
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  )
}
