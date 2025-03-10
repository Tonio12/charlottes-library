import { cn } from '@/lib/utils'
import Image from 'next/image'
import BookCoverSVG from './BookCoverSVG'

type BookCoverVariant = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide'

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: 'book-cover_extra_small',
  small: 'book-cover_small',
  medium: 'book-cover_medium',
  regular: 'book-cover_regular',
  wide: 'book-cover_wide',
}

interface BookCoverProps {
  className?: string
  variant?: BookCoverVariant
  coverColor: string
  coverImage: string
}

const BookCover = ({
  variant = 'regular',
  className,
  coverColor = '#012b48',
  coverImage = 'https://placehold.co/400x600.png',
}: BookCoverProps) => {
  return (
    <div
      className={cn(
        'relative transition-all duration-300',
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSVG coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: '12%', width: '87.5%', height: '88%' }}
      >
        <Image
          src={coverImage}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  )
}

export default BookCover
