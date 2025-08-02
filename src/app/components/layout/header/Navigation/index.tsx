'use client'
import React from 'react'
import HeaderLink from './HeaderLink'
import { headerData } from './Menudata'

const Navigation = () => {
  return (
    <nav>
      <ul className='flex items-center gap-2'>
        {headerData.map((item, index) => (
          <HeaderLink key={index} item={item} />
        ))}
      </ul>
    </nav>
  )
}

export default Navigation 