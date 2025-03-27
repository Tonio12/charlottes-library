'use server'

import { db } from '@/database/drizzle'
import { booksTable } from '@/database/schema'
export const createBook = async (values: BookParams) => {
  try {
    const newBook = await db
      .insert(booksTable)
      .values({ ...values, availableCopies: values.totalCopies })
      .returning()

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      message: 'Failed to create book',
    }
  }
}
