import { db } from '@/database/drizzle'
import { booksTable } from '@/database/schema'
import BookList from '@/src/components/BookList'
import BookOverview from '@/src/components/BookOverview'
import { desc } from 'drizzle-orm'

export default async function Home() {
  const latestBooks = (await db
    .select()
    .from(booksTable)
    .orderBy(desc(booksTable.createdAt))
    .limit(10)) as Book[]
  return (
    <>
      <BookOverview {...latestBooks[0]} />
      <BookList
        title="Latest Books"
        containerClassName="mt-28"
        books={latestBooks.slice(1)}
      />
    </>
  )
}
