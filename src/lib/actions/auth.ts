'use server'

import { signIn } from '@/auth'
import { db } from '@/database/drizzle'
import { usersTable } from '@/database/schema'
import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'

const signInWithCredentials = async (
  credentials: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = credentials

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result.error) {
      return {
        success: false,
        error: result.error,
      }
    }

    return {
      success: true,
      message: 'Signed in successfully',
    }
  } catch {
    return {
      success: false,
      error: 'Something went wrong',
    }
  }
}
const signUp = async (credentials: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } =
    credentials

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1)

  if (user.length > 0) {
    return {
      success: false,
      error: 'User already exists',
    }
  }

  const hashedPassword = await hash(password, 10)

  try {
    await db.insert(usersTable).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    })

    await signInWithCredentials({
      email,
      password,
    })

    return {
      success: true,
      message: 'User created successfully',
    }
  } catch {
    return {
      success: false,
      error: 'Something went wrong',
    }
  }
}

export { signInWithCredentials, signUp }
