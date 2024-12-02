import React from 'react'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: boolean;
}

const CustomInput = ({
  type = "text",
  onChange,
  value,
  placeholder,
  onBlur,
  name,
  className = "",
  error = false,
  ...rest
}: CustomInputProps) => {
  return <>
    <input
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`w-full shadow-custom-blur border-2 p-2 h-[50px] rounded-lg bg-[#F9F9F9] focus-visible:out ${
        error ? "border-[#F04438]" : "border-gray-300"
      } ${className}`}      {...rest}
    />
  </>
}

export default CustomInput