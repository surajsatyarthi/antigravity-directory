import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import DOMPurify from "isomorphic-dompurify"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function safeJsonLd(data: Record<string, any>): string {
  return JSON.stringify(data, (key, value) => {
    if (typeof value === 'string') {
      return DOMPurify.sanitize(value)
    }
    return value
  })
}
