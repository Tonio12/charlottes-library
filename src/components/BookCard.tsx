import Link from 'next/link'
import BookCover from './BookCover'
import { cn } from '@/src/lib/utils'
import Image from 'next/image'
import { Button } from '@/src/components/ui/button'

const BookCard = ({
  title,
  coverUrl,
  id,
  coverColor,
  isLoaned = false,
  genre,
}: Book) => {
  return (
    <li className={cn(isLoaned && 'xs:w-52 w-full')}>
      <Link
        className={cn(isLoaned && 'flex flex-col items-center  w-full')}
        href={`/books/${id}`}
      >
        <BookCover coverColor={coverColor} coverImage={coverUrl} />
        <div className={cn('mt-4', !isLoaned && 'xs:max-w-40 max-w-28')}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoaned && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="Calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left for return</p>
            </div>

            <Button className="book-btn">Download receipt</Button>
          </div>
        )}
      </Link>
    </li>
  )
}

export default BookCard
