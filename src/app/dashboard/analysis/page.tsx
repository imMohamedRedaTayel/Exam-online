import React from 'react'
import Profile from './components/profile'
import Quizes from './components/quizes'


type Props = {}

const page = (props: Props) => {



  return (
    <>
      <section className='flex flex-col gap-y-8' >
        <Profile />
        <Quizes />
      </section>
    </>
  )
}

export default page;
