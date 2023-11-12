'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

interface Props {
  path:string;
  title:string;
  icon:React.ReactNode;
}

export const SidebarItem = ({path, title, icon}:Props) => {
  const pathName = usePathname();
  return (
    <li>
      <Link href={path} className={`
        px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
        hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
        ${ path === pathName ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400': '' }
      `}>
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  )
}
