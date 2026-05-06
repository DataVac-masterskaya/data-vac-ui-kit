import { type ReactNode } from 'react'
import { Drawer as VaulDrawer } from 'vaul'
import { cn } from '../../lib/utils'

interface DrawerProps {
  trigger: ReactNode
  title: string
  children: ReactNode
  className?: string
}

export function Drawer({ trigger, title, children, className }: DrawerProps) {
  return (
    <VaulDrawer.Root direction="right">
      <VaulDrawer.Trigger asChild>{trigger}</VaulDrawer.Trigger>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40" />
        <VaulDrawer.Content
          className={cn(
            'fixed right-0 top-0 bottom-0 z-50 flex flex-col bg-bg w-[464px] pt-16 pb-10 px-8 overflow-y-auto',
            className,
          )}
        >
          <VaulDrawer.Title className="font-semibold text-lg text-text font-sans mb-5">
            {title}
          </VaulDrawer.Title>
          <div className="font-sans text-base text-text leading-5 flex-1">{children}</div>
          <VaulDrawer.Close
            aria-label="Закрыть"
            className="absolute top-4 right-4 p-2 rounded-full bg-primary-hover text-white"
          >
            ✕
          </VaulDrawer.Close>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  )
}
