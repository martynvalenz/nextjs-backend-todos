import Image from "next/image"
import Link from "next/link"
import { CiLogout } from "react-icons/ci"
import { SidebarItem } from "./SidebarItem";
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorking, IoListOutline, IoPersonOutline } from 'react-icons/io5';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "./LogoutButton";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <IoCheckboxOutline />,
    title: 'Rest TODOS',
    path: '/dashboard/rest-todos'
  },
  {
    icon: <IoListOutline />,
    title: 'Server Actions',
    path: '/dashboard/server-todos'
  },
  {
    icon: <IoCodeWorking />,
    title: 'Cookies',
    path: '/dashboard/cookies'
  },
  {
    icon: <IoBasketOutline />,
    title: 'Productos',
    path: '/dashboard/products'
  },
  {
    icon: <IoPersonOutline />,
    title: 'Perfil de usuario',
    path: '/dashboard/profile'
  },
]


export const Sidebar = async() => {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || 'User';
  const avatarUrl = session?.user?.image || 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';
  const roles = session?.user?.roles || ['Client'];
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href={'/dashboard'} title="home">
            {/* Next/Image */}
            <Image
              alt="tailus logo"
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              height={150}
              width={150}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          {/* Next/Image */}
            <Image
              alt={userName || 'User'}
              src={avatarUrl || 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'}
              height={150}
              width={150}
              className="rounded-full w-10 m-auto object-cover lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName || 'User'}</h5>
            <span className="hidden text-gray-400 lg:block capitalize">{roles.join(', ')}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* TODO: src/components <SidebarItem /> */}
          {/* <SidebarItem path="/dashboard" title="Dashboard" icon={<CiBookmarkCheck size={30} />} />
          <SidebarItem path="/categories" title="Categories" icon={<CiBookmarkCheck size={30} />} /> */}
          {
            menuItems.map( item => (
              <SidebarItem key={ item.path } {...item} />
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  )
}
