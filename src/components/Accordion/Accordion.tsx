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
        <RadixAccordion.Trigger className="flex w-full items-center justify-between gap-3 py-1 font-semibold text-base text-text font-sans group">
          <span>{title}</span>
          <span className="text-text-muted transition-transform group-data-[state=open]:rotate-180 select-none">
            −
          </span>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <div className="pt-2 pb-1 font-sans text-base text-text leading-5">{children}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  )
}
