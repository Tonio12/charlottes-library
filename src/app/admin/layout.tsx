import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import '@/src/styles/admin.css'
import Sidebar from '@/src/components/admin/sidebar'

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (!session?.user?.id) redirect('/sign-in')

  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <div className="admin-container"></div>
      <p>Header</p>
      {children}
    </main>
  )
}

export default layout
