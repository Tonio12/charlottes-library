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
  fulName: varchar('full_name', { length: 255 }).notNull(),
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
