'use client'
import { useMemo, useState } from "react";
import Button from "~/app/components/button";
import PageWrapper from "~/app/components/pageWrapper";
import Link from "next/link";
import { ResetPassword } from "./_action";
import FormWrap from "~/app/components/formWrap";
import Heading from "~/app/components/heading";
import Form from "~/app/components/form";
import { useForm } from "react-hook-form";
import { type ResetPwdUserInput } from "~/stores/mutation/user/resetPwd";
import PageSection from "~/app/components/pageSection";

export default function ({ params }: { params: { token: string } }) {
  const [isLoading, setIsLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false);
  // const pwValid = useMemo(() => p1.length > 7 && p1 === p2, [p1, p2]);
  const [error, setError] = useState<string>('')
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>()
  async function handleResetPassword(data: FormData) {
    const { error } = await ResetPassword(params.token, data)
    setResetSuccess(true)
    setError(error || '')
  }

  return (
    // <PageWrapper title="identity reset password">
    //   <FormWrap>
    //     <Heading title='Reset your password' />
    //     <form action={handleResetPassword}>
    //       <input name="password" type="password" placeholder="new password" />
    //       <input name="confirm" type="password" placeholder="confirm password" />
    //       {error && <p className="text-red-500 text-sm">{error}</p>}
    //       <Button
    //         color="neutral"
    //         type="submit"
    //       // disabled={isLoading}
    //       // onClick={handleSubmit(handleResetPassword)}
    //       // endIcon={<Image src={Group} alt="create group icon" />}
    //       >
    //         Reset password
    //       </Button>
    //       <Link href="/" />
    //     </form>
    //   </FormWrap>
    // </PageWrapper>
    <PageWrapper title="Identity FS">
      <PageSection wrapperClassName="bg-header-blue" className="my-0 py-14" />
      <PageSection wrapperClassName="bg-base-100" className="my-0 py-8">
        <div className=" w-auto items-center border-2 border-gray-100  bg-white px-10 py-20">
          <div className="mb-2">
            <h1 className="text-2xl font-semibold">Identity User Account</h1>
            <div>Reset your password</div>
            <form action={handleResetPassword}>
              <div className="relative w-full">
                <label className="        
              absolute
              text-slate-400 
              cursor-text
              text-md
              duration-150
              transform
              -translate-y-3
              top-5
              z-10
              origin-[0]
              left-4
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:trnslate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-4" htmlFor="password">
                  New Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="      
                peer 
                w-full 
                p-4 
                pt-6 
                outline-none 
                bg-white 
                font-light 
                border-2 
                rounded-md 
                transition 
                disabled:opacity-70
                disabled:cursor-not-allowed"
                  placeholder="password minimum length: 8 characters"
                />
              </div>
              <div className="my-2 flex w-full relative">
                <label className="  
              text-slate-400      
              absolute
              cursor-text
              text-md
              duration-150
              transform
              -translate-y-3
              top-5
              z-10
              origin-[0]
              left-4
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:trnslate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-4" htmlFor="confirm">
                  Repeat Password
                </label>
                <input
                  name="confirm"
                  type="password"
                  className="      
                peer 
                w-full 
                p-4 
                pt-6 
                outline-none 
                bg-white 
                font-light 
                border-2 
                rounded-md 
                transition 
                disabled:opacity-70
                disabled:cursor-not-allowed"
                  placeholder="password minimum length: 8 characters"
                />
              </div>
              {error && <p className="text-red-500 text-sm px-1">{error}</p>}
              <div className="flex w-full items-start gap-2">
                {/* <Button
                color="secondary"
                className={pwValid ? "" : "opacity-30"}
                disabled={!pwValid || resetSuccess}
                onClick={() => resetPassword(token, p1)}
              >
                Reset
              </Button> */}
                <Button
                  color="neutral"
                  type="submit"
                // disabled={isLoading}
                // onClick={handleSubmit(handleResetPassword)}
                >
                  Reset password
                </Button>
                <Link href="/login" className="flex-shrink-0">
                  <Button>Back to Login</Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </PageSection>
    </PageWrapper>
  )
}