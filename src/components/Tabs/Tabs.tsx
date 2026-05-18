import * as RadixTabs from '@radix-ui/react-tabs'
import { cn } from '../../lib/utils'
import { ReactNode } from 'react'

export type TabItem = {
  id: string
  label: string
  content?: ReactNode
}

export type TabsProps = {
  tabs: TabItem[]
  activeId: string
  onChange: (id: string) => void
  className?: string
  tabClassName?: string
  listClassName?: string
  contentClassName?: string
}

export function Tabs({
  tabs,
  activeId,
  onChange,
  className,
  tabClassName,
  listClassName,
  contentClassName,
}: TabsProps) {
  return (
    <RadixTabs.Root
      value={activeId}
      onValueChange={onChange}
      className={cn('flex flex-col gap-4', className)}
    >
      <RadixTabs.List className={cn('flex flex-wrap', listClassName)}>
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.id}
            value={tab.id}
            className={cn('transition-all', tabClassName)}
          >
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>

      {tabs.map((tab) => (
        <RadixTabs.Content
          key={tab.id}
          value={tab.id}
          className={cn('outline-none', contentClassName)}
        >
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}
