'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

import { toast } from 'sonner'
import { burrowBook } from '../lib/actions/book'
import { useRouter } from 'next/navigation'

interface Props {
  bookId: string
  userId: string
  burrowingEligibility: {
    isEligible: boolean
    message: string
  }
}

const BurrowBook = ({
  bookId,
  userId,
  burrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter()
  const [borrowing, setBorrowing] = useState(false)

  const handleBurrow = async () => {
    if (!isEligible) {
      toast.error(message)
    }
    setBorrowing(true)

    try {
      const res = await burrowBook({ bookId, userId })
      if (res.success) {
        toast.success('Book borrowed successfully')
        router.push(`/my-profile`)
      } else {
        toast.error('Something went wrong')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setBorrowing(false)
    }
  }
  return (
    <Button
      onClick={handleBurrow}
      disabled={borrowing}
      className="book-overview_btn"
    >
      <Image src="/icons/book.svg" alt="book" width={22} height={22} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? 'Borrowing...' : 'Burrow'}
      </p>
    </Button>
  )
}

export default BurrowBook
