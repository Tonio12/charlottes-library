import ImageKit from 'imagekit'
import dummyBooks from '../dummybooks.json'
import { booksTable } from './schema'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { config } from 'dotenv'

config({ path: '.env.local' })

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
})

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle({ client: sql })
const uploadToImageKit = async (
  url: string,
  fileName: string,
  folderPath: string
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName: fileName,
      folder: folderPath,
    })
    return response.filePath
  } catch (error) {
    console.error(error)
  }
}

const seed = async () => {
  console.log('Seeding...')
  try {
    for (const book of dummyBooks) {
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        '/books/covers'
      )) as string

      const videoUrl = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        '/books/videos'
      )) as string

      await db.insert(booksTable).values({ ...book, coverUrl, videoUrl })
    }

    console.log('Seeding completed')
  } catch (error) {
    console.error(error)
  }
}

seed()
