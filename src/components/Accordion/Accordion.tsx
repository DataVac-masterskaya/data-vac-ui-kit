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
}

export function AccordionItem({ title, children, value }: AccordionItemProps) {
  return (
    <RadixAccordion.Item value={value ?? title}>
      <RadixAccordion.Header>
        <RadixAccordion.Trigger className="flex w-full items-center justify-between gap-3 py-1 font-semibold text-base text-fg font-sans group">
          <span>{title}</span>
          {/* + → − анимация: вертикальная полоса схлопывается через scaleY */}
          <span className="relative flex-shrink-0 w-4 h-4 text-fg-secondary">
            <span className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-current rounded-full" />
            <span className="absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 bg-current rounded-full origin-center transition-transform duration-200 group-data-[state=open]:scale-y-0" />
          </span>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <div className="pt-2 pb-1 font-sans text-base text-fg leading-5">{children}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  )
}
