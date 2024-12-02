import { authOptions } from '@/utils/nextAuth/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {}

const page = async (props: Props) => {

  const session = await getServerSession(authOptions)

  console.log( session , 'server components' );
  

  return (
    <div>page</div>
  )
}

export default page