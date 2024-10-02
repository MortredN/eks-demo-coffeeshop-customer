import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

/* Schema definition */
export const userTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().unique(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})
