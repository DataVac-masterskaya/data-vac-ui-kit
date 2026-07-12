import { type ReactNode } from 'react'
import { Drawer as VaulDrawer } from 'vaul'
import { cn } from '../../lib/utils'

interface DrawerProps {
  trigger?: ReactNode
  title: string
  children: ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Drawer({ trigger, title, children, className, open, onOpenChange }: DrawerProps) {
  return (
    <VaulDrawer.Root direction="right" open={open} onOpenChange={onOpenChange}>
      {trigger && <VaulDrawer.Trigger asChild>{trigger}</VaulDrawer.Trigger>}
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-overlay backdrop-blur-sm z-40" />
        <VaulDrawer.Content
          className={cn(
            'fixed right-0 top-0 bottom-0 z-50 flex flex-col bg-card w-full max-w-[464px] pt-6 pb-4 px-4 md:pt-16 md:pb-10 md:px-8 overflow-y-auto overflow-x-hidden',
            className,
          )}
        >
          <VaulDrawer.Title className="font-semibold text-lg text-fg font-sans mb-5">
            {title}
          </VaulDrawer.Title>
          <div className="font-sans text-base text-fg leading-5 flex-1">{children}</div>
          <div className="flex items-center justify-center">
            <VaulDrawer.Close
              aria-label="Закрыть"
              className="absolute bottom-4 md:top-4 md:right-4 w-10 h-10 flex items-center justify-center rounded-full bg-accent xl:hover:bg-accent-hover transition-colors text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </VaulDrawer.Close>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  )
}
