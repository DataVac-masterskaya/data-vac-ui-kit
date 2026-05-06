import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

// --- Heading ---
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  size?: 'xl' | 'lg' | 'md'
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = 'h1', size = 'xl', className, ...props }, ref) => {
    const sizes = {
      xl: 'text-2xl font-semibold leading-tight',
      lg: 'text-lg font-semibold leading-snug',
      md: 'text-base font-semibold leading-snug',
    }
    return (
      <Tag ref={ref} className={cn('font-sans text-text', sizes[size], className)} {...props} />
    )
  },
)
Heading.displayName = 'Heading'

// --- Text ---
interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'md' | 'sm'
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ size = 'md', className, ...props }, ref) => {
    const sizes = { md: 'text-base leading-5', sm: 'text-sm leading-tight' }
    return <p ref={ref} className={cn('font-sans text-text', sizes[size], className)} {...props} />
  },
)
Text.displayName = 'Text'

// --- Label ---
export const Label = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('font-sans text-xs text-text-muted leading-tight', className)}
      {...props}
    />
  ),
)
Label.displayName = 'Label'

// --- Caption ---
export const Caption = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('font-sans text-[10px] text-text-muted leading-tight', className)}
      {...props}
    />
  ),
)
Caption.displayName = 'Caption'
