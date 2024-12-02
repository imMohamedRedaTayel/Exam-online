"use client";
import Input from '@/components/atoms/input'
import React, { useState } from 'react'
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: boolean 
}

const PasswordInput = ({ onChange, value, name, placeholder , error }: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  return <>
    <div className='relative' >
      <Input
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        error={error}
      />
      { showPassword ?
        <VscEye
          onClick={() => setShowPassword(!showPassword)}
          className='absolute top-1/2 right-3 -translate-y-1/2 text-2xl text-[#949BA5] cursor-pointer' /> :
        <VscEyeClosed onClick={() => setShowPassword(!showPassword)}
          className='absolute top-1/2 right-3 -translate-y-1/2 text-2xl text-[#949BA5] cursor-pointer' />
      }
    </div>
  </>
}

export default PasswordInput