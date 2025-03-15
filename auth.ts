import NextAuth, { User } from 'next-auth'
import { db } from './database/drizzle'
import { usersTable } from './database/schema'
import { eq } from 'drizzle-orm'
import { compare } from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from './src/lib/validations'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = await signInSchema.parseAsync(credentials)

        const user = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email.toString()))
          .limit(1)

        if (!user) return null

        const isValidPassword = await compare(password, user[0].password)

        if (!isValidPassword) return null

        return {
          id: user[0].id.toString(),
          email: user[0].email.toString(),
          name: user[0].fullName.toString(),
        } as User
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
      }

      return session
    },
  },
})
