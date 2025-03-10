import { cn } from '@/lib/utils'
import React, { HTMLAttributes, ReactNode } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>{
    children: ReactNode
    className?: string
}

function Heading({ children,className,...props}: HeadingProps) {
  return (
      <h1
          className={ cn( " text-2xl  md:text-5xl font-semibold w-full tracking-tight  text-deepBlue-500 ",className)}
          {...props}
      >{children}</h1>
  )
}

export default Heading