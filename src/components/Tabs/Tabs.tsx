import * as RadixTabs from '@radix-ui/react-tabs'
import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
  className?: string
}

export function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  return (
    <RadixTabs.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn('flex flex-col gap-4', className)}
    >
      {children}
    </RadixTabs.Root>
  )
}

interface TabsListProps {
  children: ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <RadixTabs.List className={cn('flex flex-wrap gap-2 items-center', className)}>
      {children}
    </RadixTabs.List>
  )
}

interface TabsTriggerProps {
  value: string
  children: ReactNode
  className?: string
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      value={value}
      className={cn(
        'h-8 px-3 py-1 rounded-pill text-base font-sans font-medium transition-colors',
        'bg-interactive text-fg',
        'data-[state=active]:bg-neutral data-[state=active]:text-white',
        className,
      )}
    >
      {children}
    </RadixTabs.Trigger>
  )
}

interface TabsContentProps {
  value: string
  children?: ReactNode
  className?: string
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  return (
    <RadixTabs.Content value={value} className={cn('outline-none', className)}>
      {children}
    </RadixTabs.Content>
  )
}
