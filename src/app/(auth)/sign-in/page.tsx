'use client'
import AuthForm from '@/components/AuthForm'
import { signInSchema } from '@/lib/validations'
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
        onSubmit={() => {}}
      />
    </div>
  )
}

export default page
