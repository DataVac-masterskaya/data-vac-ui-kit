import * as RadixTooltip from '@radix-ui/react-tooltip'
import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={200}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={cn(
              'z-50 px-3 py-2 rounded-tooltip text-xs text-white bg-neutral',
              'animate-in fade-in-0 zoom-in-95',
              className,
            )}
            sideOffset={4}
          >
            {content}
            <RadixTooltip.Arrow className="fill-neutral" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
