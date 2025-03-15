'use client'
import { cn } from '@/src/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Header = () => {
  const pathname = usePathname()
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="Book Wise" width={40} height={40} />
      </Link>
      <ul className="flex flex-row gap-8 items-center">
        <li>
          <Link
            href="/library"
            className={cn(
              'text-base cursor-pointer capitalize',
              pathname === 'library' ? 'text-light-200' : 'text-light-100'
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
