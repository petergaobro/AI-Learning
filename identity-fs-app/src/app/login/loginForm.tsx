'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Form from '../components/form'
import Button from '../components/button'
import Heading from '../components/heading'
import GoogleFlat from '../../../public/img/svg/google-flat.svg'
import Image from 'next/image'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { type SafeUser } from '../types/safeUser'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
interface LoginUserProps {
  currentUser: SafeUser | null;
}
const LoginForm: React.FC<LoginUserProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    if (currentUser) {
      router.push("/watsonx");
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/watsonx");
        router.refresh();
        toast.success("Logged in");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    })
      .catch(() => toast.error('Something went wrong of callback'))
    console.log(data, 'login form');
  }

  const handleSignInGoogle = () => {
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
      <Heading title='Identity FS APP' />
      <hr className='bg-slate-300 w-full h-px' />
      <Form
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Form
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
      />
      <Button
        color="none"
        type="submit"
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      // endIcon={<Image src={Group} alt="create group icon" />}
      >
        {isLoading ? "Loading" : 'Login'}
      </Button>
      <p className='text-sm'>
        Do not have a account?
        <Link className='underline' href='/register'>Sign up</Link>
      </p>
      <Button
        color="none"
        inverse
        type="submit"
        disabled={isLoading}
        onClick={handleSignInGoogle}
        startIcon={<Image src={GoogleFlat} alt="google icon" />}
      >
        Continue with Google
      </Button >
      {/* <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link> */}
    </>
  )
}

export default LoginForm