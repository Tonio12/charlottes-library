import { auth, signOut } from '@/auth'
import { db } from '@/database/drizzle'
import { booksTable, usersTable } from '@/database/schema'
import BookList from '@/src/components/BookList'
import { Button } from '@/src/components/ui/button'
import UserProfile from '@/src/components/UserProfile'
import { eq } from 'drizzle-orm'

const page = async () => {
  const books = await db.select().from(booksTable).limit(5)
  const session = await auth()
  const user = session?.user

  const userDetails = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, user!.id))
    .limit(1)

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
      <div className="mt-10 flex flex-col items-start gap-14 lg:flex-row">
        <UserProfile user={userDetails!} />
        <BookList containerClassName="" title="Burrowed Books" books={books} />
      </div>
    </>
  )
}

export default page
