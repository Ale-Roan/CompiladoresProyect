import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  return (
    redirect('/views/homePage')
  )
}

export default page
