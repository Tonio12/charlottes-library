import Image from 'next/image'
import BookCover from './BookCover'
import BurrowBook from './BurrowBook'
import { usersTable } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/database/drizzle'

interface Props extends Book {
  userId: string
}

const BookOverview = async ({
  id,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))

  if (!user) return null

  const burrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === 'APPROVED',
    message:
      availableCopies > 0 ? 'You can borrow this book' : 'No copies available',
  }
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Genre: <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Copies: <span>{totalCopies}</span>
          </p>
          <p>
            Available Copies: <span>{availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>

        <BurrowBook
          bookId={id}
          userId={userId}
          burrowingEligibility={burrowingEligibility}
        />
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookOverview
