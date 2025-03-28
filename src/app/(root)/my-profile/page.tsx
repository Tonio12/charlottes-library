import { signOut } from '@/auth'
import { db } from '@/database/drizzle'
import { booksTable } from '@/database/schema'
import BookList from '@/src/components/BookList'
import { Button } from '@/src/components/ui/button'

const page = async () => {
  const books = await db.select().from(booksTable).limit(5)
  console.log(books)
  return (
    <>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <Button>Logout</Button>
      </form>
      <BookList containerClassName="" title="Burrowed Books" books={books} />
    </>
  )
}

export default page
