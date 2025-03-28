import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const STATUS_ENUM = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED'])
export const USER_ROLE_ENUM = pgEnum('role', ['ADMIN', 'USER'])
export const BURROW_STATUS_ENUM = pgEnum('borrow_status', [
  'BURROWED',
  'RETURNED',
])

export const usersTable = pgTable('users', {
  id: uuid('id').notNull().primaryKey().unique().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  universityId: integer('university_id').notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  universityCard: text('university_card').notNull(),
  status: STATUS_ENUM('status').default('PENDING'),
  role: USER_ROLE_ENUM('role').default('USER'),
  lastActivityDate: date('last_activity_date').notNull().defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const booksTable = pgTable('books', {
  id: uuid('id').notNull().primaryKey().unique().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  genre: varchar('genre', { length: 255 }).notNull(),
  rating: integer('rating').notNull().default(1),
  totalCopies: integer('total_copies').notNull(),
  availableCopies: integer('available_copies').notNull(),
  description: text('description').notNull(),
  coverUrl: text('cover_url').notNull(),
  coverColor: varchar('cover_color', { length: 7 }).notNull(),
  videoUrl: text('video_url').notNull(),
  summary: text('summary').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const burrowRecords = pgTable('burrow_records', {
  id: uuid('id').notNull().primaryKey().unique().defaultRandom(),
  userId: uuid('user_id').references(() => usersTable.id),
  bookId: uuid('book_id').references(() => booksTable.id),
  burrowDate: timestamp('burrow_date', { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date('due_date').notNull(),
  returnDate: date('return_date'),
  status: BURROW_STATUS_ENUM('status').default('BURROWED').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
