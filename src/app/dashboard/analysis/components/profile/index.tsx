import React from 'react'
import { FaFlag } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import Image from 'next/image'

type Props = {}

const Profile = (props: Props) => {

    const details = [
        {
          icon: <FaFlag />,
          number: 7,
          title: "Quiz Passed"
        },
        {
          icon: <MdOutlineAccessTimeFilled />,
          number: 7,
          title: "Quiz Passed"
        },
        {
          icon: <FaCheckCircle />,
          number: 7,
          title: "Quiz Passed"
        }
      ]

    return (
        <div>
            <div className='w-full bg-white shadow-lg rounded-[20px]'>
                <div className='flex flex-wrap py-[32px] px-[16px]'>
                    <div className='w-full md:w-3/12'>
                        <Image
                            src='/asstes/dashboard/profile.png'
                            alt='image'
                            width={216}
                            height={216}
                            className="mx-auto md:mx-0" // Center image on smaller screens
                        />
                    </div>
                    <div className='w-full md:w-9/12'>
                        <div className='pl-[30px] md:pl-[30px]'>

                            <h2 className='text-[28px] md:text-[32px] font-[700] text-[--mainColor]'>
                                Mohamed Reda
                            </h2>
                            <p className='text-[--light-gray] text-[18px] md:text-[20px] font-normal'>
                                Voluptatem aut
                            </p>

                            <div className="w-full h-[12px] my-[24px] bg-gray-200 rounded-full">
                                <div className="h-[12px] bg-[--mainColor] rounded-full w-[80%]"></div>
                            </div>

                            <div className='flex flex-wrap items-center justify-between'>
                                {details.map((card, index) => (
                                    <div key={index} className='w-full sm:w-1/3 flex items-center gap-x-[16px] mb-[16px] sm:mb-0'>
                                        <div className='w-[70px] h-[70px] flex items-center justify-center bg-white shadow-lg rounded-[10px]'>
                                            <span className='text-[40px] text-[--mainColor]'>{card.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className='text-[24px] md:text-[30px] font-[700] text-[--text-gray]'>{card.number}</h4>
                                            <h4 className='text-[14px] md:text-[16px] font-[400] text-[--light-gray]'>{card.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile