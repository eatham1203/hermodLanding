import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/** Page gutter and max width shared by every section. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)} {...props} />
}
