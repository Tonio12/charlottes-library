import { auth } from '@/auth'
import { db } from '@/database/drizzle'
import { booksTable } from '@/database/schema'
import BookOverview from '@/src/components/BookOverview'
import BookVideo from '@/src/components/BookVideo'
import { eq } from 'drizzle-orm'
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
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default page
