'use server'

import { signIn } from '@/auth'
import { db } from '@/database/drizzle'
import { usersTable } from '@/database/schema'
import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import ratelimit from '../ratelimit'
import { redirect } from 'next/navigation'
import { workflowClient } from '../workflow'
import config from '../config'

const signInWithCredentials = async (
  credentials: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = credentials
  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    redirect('/too-fast')
    return {
      success: false,
      error: 'Too many requests',
    }
  }

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

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return {
      success: false,
      error: 'Too many requests',
    }
  }

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

    await workflowClient.trigger({
      url: `${config.env.prodApiUrl}/api/workflow/onboarding`,
      body: {
        email,
        fullName,
      },
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
