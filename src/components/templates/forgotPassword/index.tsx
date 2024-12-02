"use client"
import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import { showToast, ToastContainer } from '@/utils/swal'
import axios from 'axios'
import { useFormik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { validationSchema } from '@/app/(auth)/forgetPassword/forgetPassword.validation'
import { FormValues } from '@/types'

type Props = {}

const ForgetTemplates = (props: Props) => {

    const router = useRouter()
    const handleSubmit = async (formValues: FormValues) => {
        try {
            let { data } = await axios.post(`https://exam.elevateegy.com/api/v1/auth/forgotPassword`, formValues)
            // console.log(data, 'data');
            if (data.message === 'success') {
                showToast.success("OTP sent to your email");
                setTimeout(() => {
                    router.push("/verifyCode");
                }, 2000);
            }
        } catch (error: any) {
            // console.error(error);
            showToast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    return <>
        <div className='flex flex-col items-center justify-center h-full ' >
            <ToastContainer />

            <form onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
            }} className='w-full md:w-[70%]  flex flex-col gap-y-[20px] ' >
                <h2 className=' text-[24px] font-[700] ' >Forgot your password? </h2>

                <Input
                    name='email'
                    placeholder="Enter Email"
                    type='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.touched.email && !!formik.errors.email}
                />

                <Link href={"/setPassword"} className="text-[16px] font-normal text-[--mainColor] text-end ">
                    Recover Password ?
                </Link>

                <Button type='submit'  > Sign in  </Button>

            </form>

            <div className=" flex pt-[20px] items-center gap-x-3 ">
                <div className="divider h-[1px] bg-[#E7E7E7]  md:w-[133px]"></div>
                <p className='text-[#6C737F]' > Or Continue with</p>
                <div className="divider  h-[1px] bg-[#E7E7E7] md:w-[133px]"></div>
            </div>

            <div className="social-login flex gap-x-[30px] pt-[20px]  pb-[20px] ">
                <div className="login-item flex justify-center hover:shadow-lg items-center border p-4 shadow-md rounded-lg cursor-pointer">
                    <Image width={20} height={20} alt="image" src={"/asstes/social/LogoGoogle.png"} />
                </div>
                <div
                    // onClick={() => signIn("github", { callbackUrl: "/client" })}
                    className="login-item flex justify-center hover:shadow-lg items-center border p-4 shadow-md rounded-lg cursor-pointer"
                >
                    <Image width={20} height={20} alt="image" src={"/asstes/social/xLogo.png"} />
                </div>
                <div className="login-item flex justify-center hover:shadow-lg items-center border p-4 shadow-md rounded-lg cursor-pointer">
                    <Image width={20} height={20} alt="image" src={"/asstes/social/facebook.png"} />
                </div>
                <div className="login-item flex justify-center hover:shadow-lg items-center border p-4 shadow-md rounded-lg cursor-pointer">
                    <Image width={20} height={20} alt="image" src={"/asstes/social/maclogo.png"} />
                </div>
            </div>

        </div>
    </>
}

export default ForgetTemplates