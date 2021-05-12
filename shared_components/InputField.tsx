import { InputHTMLAttributes, LegacyRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  classNames?: string;
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const InputField = ({
  error,
  classNames,
  register,
  id,
  label,
  ...restProps
}: InputFieldProps) => {
  return (
    <div className="flex flex-col space-y-1 ">
      <label className="font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        {...register}
        className=" rounded-full border-2 border-gray-400 focus:outline-none p-2 focus:shadow-lg transition duration-300 "
        {...restProps}
      ></input>
      <div className="text-red-500 text-xs font-medium">{error?.message}</div>
    </div>
  );
};
