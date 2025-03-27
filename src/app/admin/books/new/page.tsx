import BookForm from '@/src/components/admin/Bookform'
import { Button } from '@/src/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  )
}

export default page
