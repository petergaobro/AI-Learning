
'use client'
import { type FieldErrors, type FieldValues, type UseFormRegister } from "react-hook-form"
import { Toaster } from "react-hot-toast";

type FormProps = {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors
  isValidError?: any,
  placeHolder?: string
}
const Form: React.FC<FormProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  isValidError,
  placeHolder
}) => {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeHolder}
        type={type}
        className={`
      ${errors[id] ? 'border-rose-400' : 'border-slate-300'} 
      ${errors[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'} 
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
      disabled:cursor-not-allowed
            `}
      />
      <label htmlFor={id}
        className={`
        ${errors[id] ? 'text-rose-500' : 'text-slate-400'} 
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
        peer-focus:-translate-y-4
        `}
      >
        {label}
      </label>
      <p className="text-red-500 font-bold px-1">{isValidError}</p>
    </div>
  )
}

export default Form;