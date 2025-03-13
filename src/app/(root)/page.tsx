import BookList from '@/src/components/BookList'
import BookOverview from '@/src/components/BookOverview'
import { sampleBooks } from '@/src/constants'

export default async function Home() {
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        containerClassName="mt-28"
        books={sampleBooks}
      />
    </>
  )
}
