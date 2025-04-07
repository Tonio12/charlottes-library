import { db } from '@/database/drizzle'
import { burrowRecords } from '@/database/schema'
import { and, count, eq } from 'drizzle-orm'

export async function getNumOfBurrowedBook(id: string) {
  const burrowedBooks = await db
    .select({
      count: count(burrowRecords.id),
    })
    .from(burrowRecords)
    .where(
      and(eq(burrowRecords.userId, id), eq(burrowRecords.status, 'BURROWED'))
    )

  return burrowedBooks[0].count
}
