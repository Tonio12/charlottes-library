'use client'

import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (
    <div>
      <AuthForm
        schema={signUpSchema}
        defaultValues={{
          fullName: '',
          email: '',
          universityId: '',
          universityCard: '',
          password: '',
        }}
        type="SIGN_UP"
        onSubmit={() => {}}
      />
    </div>
  )
}

export default page
