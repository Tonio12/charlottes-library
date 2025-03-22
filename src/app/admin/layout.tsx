import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import '@/src/styles/admin.css'
import Sidebar from '@/src/components/admin/Sidebar'
import Header from '@/src/components/admin/Header'

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (!session?.user?.id) redirect('/sign-in')

  return (
    <main className="flex min-h-screen w-full">
      <Sidebar session={session} />

      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  )
}

export default layout
