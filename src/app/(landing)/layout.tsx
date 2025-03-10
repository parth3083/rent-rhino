import Navbar from '@/components/Navbar'
import React, {  ReactNode } from 'react'

function layout({ children }: {children:ReactNode}) {
  return (
      <>
          <Navbar />
          { children}
      </>
  )
}

export default layout