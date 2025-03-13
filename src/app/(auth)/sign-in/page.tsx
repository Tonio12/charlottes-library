'use client'
import AuthForm from '@/src/components/AuthForm'
import { signInWithCredentials } from '@/src/lib/actions/auth'
import { signInSchema } from '@/src/lib/validations'
import React from 'react'

const page = () => {
  return (
    <div>
      <AuthForm
        schema={signInSchema}
        defaultValues={{
          email: '',
          password: '',
        }}
        type="SIGN_IN"
        onSubmit={signInWithCredentials}
      />
    </div>
  )
}

export default page
