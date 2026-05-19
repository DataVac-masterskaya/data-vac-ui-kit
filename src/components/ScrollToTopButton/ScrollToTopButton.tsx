import { RefObject, useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { ChevronDownIcon } from '../..'

export interface ScrollToTopButtonProps {
  scrollContainer?: RefObject<HTMLElement | null>
  scrollThreshold?: number
  className?: string
}

export const ScrollToTopButton = ({
  scrollContainer,
  scrollThreshold = 200,
  className,
}: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const container: HTMLElement | Window = scrollContainer?.current || window

    const handleScroll = () => {
      const scrolledAmount =
        container === window ? window.scrollY : (container as HTMLElement).scrollTop
      setIsVisible(scrolledAmount > scrollThreshold)
    }

    container.addEventListener('scroll', handleScroll)

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [scrollContainer, scrollThreshold])

  const handleClick = () => {
    if (scrollContainer?.current) {
      scrollContainer.current?.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <button
      type="button"
      aria-label="Наверх"
      onClick={handleClick}
      className={cn(
        scrollContainer ? 'absolute' : 'fixed',
        'bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full rotate-180',
        'bg-[#E30C5C] text-white shadow-md transition-opacity duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E30C5C]',
        isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        className,
      )}
    >
      <ChevronDownIcon />
    </button>
  )
}
