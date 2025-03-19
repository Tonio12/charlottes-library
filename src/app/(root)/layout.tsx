import { auth } from '@/auth'
import { db } from '@/database/drizzle'
import { usersTable } from '@/database/schema'
import Header from '@/src/components/Header'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { after } from 'next/server'
import React from 'react'

async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) {
    redirect('/sign-in')
  }

  after(async () => {
    if (!session?.user?.id) return

    await db
      .update(usersTable)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(usersTable.id, session.user.id))
  })
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  )
}

export default layout
