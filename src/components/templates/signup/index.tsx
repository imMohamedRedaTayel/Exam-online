"use client";

import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import PasswordInput from '@/components/molecules/passwordInput'
import axios from "axios";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useFormik } from "formik";
import { validationSchema } from '@/app/(auth)/signup/register.validation';
import { useRouter } from 'next/navigation';
import { showToast, ToastContainer } from '@/utils/swal';
import { signIn } from 'next-auth/react';
import { FormValues } from '@/types';


type Props = {}

const SignupTemplates = (props: Props) => {

    const router = useRouter()

    const handleSubmit = async (formValues: FormValues) => {
        // console.log(formValues, 'formValues');
        try {
            let { data } = await axios.post(`https://exam.elevateegy.com/api/v1/auth/signup`, formValues)
            // console.log(data, 'data');
            if (data.message === 'success') {
                showToast.success("The account has been created successfully.");
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            }
        } catch (error: any) {
            // console.error(error);
            showToast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    return <>
        <div className='flex flex-col items-center  justify-center h-full ' >
            <ToastContainer />
            <form onSubmit={formik.handleSubmit} className='w-full md:w-[70%]  flex flex-col gap-y-[20px] ' >
                <h2 className=' text-[24px] font-[700] ' >Sign Up</h2>

                <Input
                    name='username'
                    placeholder="User Name"
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && !!formik.errors.username}
                />
                {/* {formik.touched.username && formik.errors.username && (
                    <p className="text-[#F04438]">{formik.errors.username}</p>
                )} */}

                <Input
                    name='firstName'
                    placeholder="First Name"
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && !!formik.errors.firstName}

                />

                <Input
                    name='lastName'
                    placeholder="Last Name"
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && !!formik.errors.lastName}
                />

                <Input
                    name='email'
                    placeholder="Email"
                    type='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && !!formik.errors.email}

                />

                <PasswordInput
                    name='password'
                    placeholder="Password"
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && !!formik.errors.password}

                />

                <PasswordInput
                    name='rePassword'
                    placeholder="Confirm Password"
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.rePassword}
                    onBlur={formik.handleBlur}
                    error={formik.touched.rePassword && !!formik.errors.rePassword}

                />

                <Input
                    name='phone'
                    placeholder="phone"
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && !!formik.errors.phone}

                />

                <p className="text-[16px] font-normal text-center">
                    Already have an account?{" "}
                    <Link href={'/login'} className="text-[#4461F2] cursor-pointer font-normal "> Login </Link>
                </p>

                <Button type='submit'  > Create Account  </Button>

            </form>

            <div className=" flex pt-[20px] items-center gap-x-3 ">
                <div className="divider h-[1px] bg-[#E7E7E7]  md:w-[133px]"></div>
                <p className='text-[#6C737F]' > Or Continue with</p>
                <div className="divider  h-[1px] bg-[#E7E7E7] md:w-[133px]"></div>
            </div>

            <div className="social-login flex gap-x-[30px] pt-[20px]  pb-[20px] ">
                <div
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="login-item flex justify-center hover:shadow-lg items-center border p-4 shadow-md rounded-lg cursor-pointer">
                    <Image width={20} height={20} alt="image" src={"/asstes/social/LogoGoogle.png"} />
                </div>
                <div
                    onClick={() => signIn("twitter", { callbackUrl: "/" })}
                    className="login-item flex justify-center hover:shadow-lg items-center border p-4 shadow-md rounded-lg cursor-pointer"
                >
                    <Image width={20} height={20} alt="image" src={"/asstes/social/xLogo.png"} />
                </div>
                <div
                    onClick={() => signIn("facebook", { callbackUrl: "/" })}
                    className="login-item flex justify-center hover:shadow-lg items-center border p-4 shadow-md rounded-lg cursor-pointer">
                    <Image width={20} height={20} alt="image" src={"/asstes/social/facebook.png"} />
                </div>
                <div className="login-item flex justify-center hover:shadow-lg items-center border p-4 shadow-md rounded-lg cursor-pointer">
                    <Image width={20} height={20} alt="image" src={"/asstes/social/maclogo.png"} />
                </div>
            </div>

        </div>
    </>
}

export default SignupTemplates