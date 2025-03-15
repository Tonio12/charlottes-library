import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserInitial(name: string) {
  const userNameArray = name.split(' ')
  let initials = ''
  for (const name of userNameArray) {
    initials += name[0]
  }
  return initials.slice(0, 2)
}
