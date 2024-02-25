import {
  ArrowRightIcon,
  CalendarIcon,
  CameraIcon,
  ChartBarIcon,
  ChartPieIcon,
  ChatIcon,
  DocumentIcon,
  SupportIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import { cloneElement, useContext } from 'react'
import { UserContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

function LeftSideBar() {
  const { setUser } = useContext(UserContext)

  function handleLogout() {
    setUser(null)
  }

  function NavigationItem({ icon, text, route, onClickCb }) {
    return (
      <div className="flex gap-2 w-full">
        {cloneElement(icon, { className: 'w-6' })}
        <Link
          to={route}
          className="text-white no-underline visited:text-white"
          onClick={onClickCb}
        >
          {text}
        </Link>
      </div>
    )
  }

  return (
    <div
      className="min-h-full bg-slate-400 md:w-full md:min-w-44 max-w-52 
      md:flex flex-col items-center gap-6 px-6 pt-4 text-white hidden"
    >
      <p className="text-2xl font-semibold">DocAux</p>
      <UserCircleIcon className="w-24 text-gray-700" />
      <NavigationItem icon={<ChartPieIcon />} text="Dashboard" route="/" />
      <NavigationItem
        icon={<CalendarIcon />}
        text="Schedule"
        route="/schedule"
      />
      <NavigationItem
        icon={<DocumentIcon />}
        text="Documents"
        route="/documents"
      />
      <NavigationItem icon={<ChartBarIcon />} text="Reports" route="/reports" />
      <NavigationItem icon={<SupportIcon />} text="Support" route="/support" />
      <NavigationItem icon={<ChatIcon />} text="Messages" route="/messages" />
      <NavigationItem
        icon={<CameraIcon />}
        text="Image Capture"
        route="/image-capture"
      ></NavigationItem>
      <NavigationItem
        icon={<ArrowRightIcon />}
        text="Logout"
        onClickCb={handleLogout}
      />
    </div>
  )
}

export default LeftSideBar
