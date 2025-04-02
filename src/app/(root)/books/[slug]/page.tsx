import { auth } from '@/auth'
import { db } from '@/database/drizzle'
import { booksTable } from '@/database/schema'
import BookCover from '@/src/components/BookCover'
import BookOverview from '@/src/components/BookOverview'
import BookVideo from '@/src/components/BookVideo'
import { eq, and, ne } from 'drizzle-orm'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const session = await auth()
  const slug = (await params).slug

  const [bookDetails] = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, slug))
    .limit(1)

  if (!bookDetails) {
    redirect('/404')
  }

  const similarBooks = await db
    .select()
    .from(booksTable)
    .where(
      and(
        eq(booksTable.genre, bookDetails.genre),
        ne(booksTable.id, bookDetails.id)
      )
    )
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1_1_0%]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex gap-5">
            <div className="flex flex-col gap-7">
              <h3>Summary</h3>
              <div className="space-y-5 text-xl text-light-100">
                {bookDetails.summary.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </section>
        </div>
        {similarBooks.length > 0 && (
          <div>
            <h3>Similar Books</h3>
            <div className="mt-7 flex flex-wrap gap-5">
              {similarBooks.map((book) => (
                <Link href={`/books/${book.id}`} key={book.id}>
                  <BookCover
                    coverImage={book.coverUrl}
                    key={book.id}
                    {...book}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default page
