'use client'
import { cn } from '@/src/lib/utils'
import BookCoverSVG from './BookCoverSVG'
import { IKImage } from 'imagekitio-next'
import config from '../lib/config'

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
        <IKImage
          urlEndpoint={config.env.imagekit.urlEndpoint}
          path={coverImage}
          alt="Book cover"
          fill
          loading="lazy"
          lqip={{ active: true }}
        />
      </div>
    </div>
  )
}

export default BookCover
