'use client'
import React, { useState } from 'react'
import Form from '../components/form'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import Button from '../components/button'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { type ForgetPwdUserInput } from '~/stores/mutation/user/forgetPwd'
import { trpc } from '~/server/utils/trpc'

const ForgetForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register, formState: { errors } } = useForm<ForgetPwdUserInput>()
  const router = useRouter()

  const { mutate, error } = trpc.forget.forgetPwd.useMutation({
    onSuccess: () => {
      router.push('/')
      router.push('/forgetPassword/success')
    },
  })

  function sendResetRequest(values: ForgetPwdUserInput) {
    setIsLoading(true);
    mutate(values)
    // redirect("/views/verify-email")
  }

  // const sendResetRequest: SubmitHandler<FieldValues> = (data) => {
  //   setIsLoading(true);
  //   axios.post('/api/resetRequest', data)
  //     .then(() => {
  //       toast.success('Please check your account to reset password')
  //       router.push('/forgetPassword/success')
  //       // signIn('credentials', {
  //       //   email: data.email,
  //       //   password: data.password,
  //       //   redirect: false
  //       // }).then((callback) => {
  //       //   if (callback?.ok) {
  //       //     router.push('/watsonx')
  //       //   }
  //       //   if (callback?.error) {
  //       //     toast.error(callback.error)
  //       //   }
  //       // })
  //       // .catch(() => toast.error('Something went wrong of callback'))
  //     })
  //     .catch(() => toast.error('Something went wrong of post api'))
  //     .finally(() => {
  //       setIsLoading(false)
  //     })
  //   console.log(data, 'reset password form');
  // }
  return (
    <div className=" w-auto items-center border-2 border-gray-100  bg-white px-10 py-20">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold">Identity User Account</h1>
        <div>
          Forgot your password? Enter your email address below and we will
          send you a link to reset it.
        </div>
        <Form
          id='email'
          label='Email'
          // disabled={isLoading}
          register={register}
          errors={errors}
          isValidError={error?.message}
          required
        />
        <Button
          color="none"
          type="submit"
          // disabled={isLoading}
          onClick={handleSubmit(sendResetRequest)}
        // endIcon={<Image src={Group} alt="create group icon" />}
        >
          Request Reset
        </Button>
        <p className='text-sm mt-3'>
          <Link className='underline' href='/login'>return to login</Link>
        </p>
        {/* <Form
        schema={schema}
        model={model}
        onSubmit={onSubmit}
        className="mt-5 grid grid-cols-6"
        edit
        submitButton={
          <div className="col-span-6 flex w-full gap-1">
            <Button type="submit">Request Reset</Button>
            <Link href={loginHref}>
              <Button color="secondary">Back to Login</Button>
            </Link>
          </div>
        }
      /> */}
      </div>
    </div>
  )
}

export default ForgetForm