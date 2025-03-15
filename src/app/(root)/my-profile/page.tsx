import { signOut } from '@/auth'
import BookList from '@/src/components/BookList'
import { Button } from '@/src/components/ui/button'
import { sampleBooks } from '@/src/constants'

const page = () => {
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
      <BookList
        containerClassName=""
        title="Burrowed Books"
        books={sampleBooks}
      />
    </>
  )
}

export default page
