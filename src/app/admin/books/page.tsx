import { Button } from '@/src/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <section className="w-full rounded-3xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create New Book
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <p>Table</p>
      </div>
    </section>
  )
}

export default page
