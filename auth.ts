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
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const validatedCredentials =
            await signInSchema.parseAsync(credentials)
          const { email, password } = validatedCredentials

          const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1)

          if (!user.length) return null

          const isValidPassword = await compare(password, user[0].password)

          if (!isValidPassword) return null

          return {
            id: user[0].id.toString(),
            email: user[0].email.toString(),
            name: user[0].fullName.toString(),
          } as User
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
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
  trustHost: true,
})
