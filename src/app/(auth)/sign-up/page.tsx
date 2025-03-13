'use client'

import AuthForm from '@/src/components/AuthForm'
import { signUp } from '@/src/lib/actions/auth'
import { signUpSchema } from '@/src/lib/validations'

const page = () => {
  return (
    <div>
      <AuthForm
        schema={signUpSchema}
        defaultValues={{
          fullName: '',
          email: '',
          universityId: 0,
          universityCard: '',
          password: '',
        }}
        type="SIGN_UP"
        onSubmit={signUp}
      />
    </div>
  )
}

export default page
