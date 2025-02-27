'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { type RegisterUserInput } from '~/stores/mutation/user/register'
import { trpc } from '~/server/utils/trpc'
import { type SafeUser } from '../types/safeUser'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Heading from '../components/heading'
import Button from '../components/button'
import GoogleFlat from '../../../public/img/svg/google-flat.svg'
import Image from 'next/image'
import Form from '../components/form'


interface RegisterUserProps {
  currentUser: SafeUser | null;
}
const RegisterForm: React.FC<RegisterUserProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register, formState: { errors } } = useForm<RegisterUserInput>()
  const router = useRouter()

  const { mutate, error } = trpc.user.register.useMutation({
    onSuccess: () => {
      router.push('/verify-email')
    },
  })

  function onSubmit(values: RegisterUserInput) {
    // if (error) {
    //   redirect("/register")
    // }
    setIsLoading(true);
    mutate(values)
  }

  const handleSignUpGoogle = () => {
    signIn("google")
      .catch((error) => {
        console.log(error, "error in handle sign in google");
      })
  }

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting...</p>;
  }

  return (
    <>
      <Heading title='Register' />
      <hr className='bg-slate-300 w-full h-px' />
      <Form
        id='username'
        label='Username'
        // disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Form
        id='name'
        label='Name'
        // disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Form
        id='email'
        label='Email'
        // disabled={isLoading}
        register={register}
        errors={errors}
        isValidError={error?.message}
        required
      />
      <Form
        id='password'
        label='Password'
        // disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
      />
      <Button
        color="neutral"
        type="submit"
        // disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      >
        {isLoading ? "Loading" : 'Sign Up'}
      </Button>
      <p className='text-sm'>
        Already have an account?
        <Link className='underline' href='/login'>Login</Link>
      </p>
      <Button
        color="none"
        inverse
        type="submit"
        // disabled={isLoading}
        onClick={handleSignUpGoogle}
        startIcon={<Image src={GoogleFlat} alt="google icon" />}
      >
        Continue with Google
      </Button >
    </>
  )
}

export default RegisterForm
