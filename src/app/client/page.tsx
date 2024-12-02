"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

type Props = {}

const page = (props: Props) => {

    const { data , status , update } = useSession()

    console.log( data , 'client component' );
    

  return (
    <div>page</div>
  )
}

export default page