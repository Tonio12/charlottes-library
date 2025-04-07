import { db } from '@/database/drizzle'
import { usersTable } from '@/database/schema'
import UsersTable from '@/src/components/admin/UsersTable'

const Page = async () => {
  const users = await db.select().from(usersTable)

  return (
    <div className="bg-white">
      <UsersTable users={users} />
    </div>
  )
}

export default Page
