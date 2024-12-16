"use client"
import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import { showToast, ToastContainer } from '@/utils/swal'
import axios from 'axios'
import { useFormik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { validationSchema } from '@/app/(auth)/verifyCode/verifyCode.validation'
import { FormValues } from '@/types'

type Props = {}

const VerifyCodeTemplates = (props: Props) => {

    const router = useRouter()
    const handleSubmit = async (formValues: FormValues) => {
        // console.log(formValues.resetCode , 'formValues.resetCode');
        
        try {
            let { data } = await axios.post(`https://exam.elevateegy.com/api/v1/auth/verifyResetCode`, 
                {
                    resetCode: formValues.resetCode.toString() ,
                }
            )
            // console.log(data, 'data');
            if (data.status === 'Success') {
                showToast.success("The reset code is valid.");
                setTimeout(() => {
                    router.push("/setPassword");
                }, 2000);
            }
        } catch (error: any) {
            // console.error(error);
            showToast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleResend = () => {
        // هنا يمكن عرض رسالة للمستخدم أو إرشاده حول كيفية إعادة إرسال الكود
        showToast.info("Please check your email for a reset code. If you didn't receive one, try requesting it again.");
    };

    const formik = useFormik({
        initialValues: {
            resetCode: "",
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
                <h2 className=' text-[24px] font-[700] ' >Verify code </h2>

                <Input
                    name='resetCode'
                    placeholder="Enter Code"
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.resetCode}
                    error={formik.touched.resetCode && !!formik.errors.resetCode}
                />

                <h3  className="text-[16px] font-normal  text-end ">
                    Didn’t receive a code? <span onClick={handleResend} className='text-[--mainColor] cursor-pointer ' > Resend </span>
                </h3>

                <Button type='submit'  > Verify  </Button>

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

export default VerifyCodeTemplates