"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import FrontEndQuiz from './components/FrontEndQuiz'
import FrameworkQuiz from './components/FrameworkQuiz'

type Props = {}

const page = (props: Props) => {

  const { data, status, update } = useSession()

  console.log(data, 'client component');


  return (
    <>
      <section className='flex flex-col gap-y-8' >
        <FrontEndQuiz />
        <FrameworkQuiz />
      </section>
    </>
  )
}

export default page