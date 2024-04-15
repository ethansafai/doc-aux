import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
  ChartPieIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import { cloneElement, useContext, useState } from 'react'
import { UserContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import sharedAxios from '../../services/httpService'
import { AxiosError } from 'axios'

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

function LeftSideBar() {
  const { user, setUser } = useContext(UserContext)
  const [sideBarOpen, setSideBarOpen] = useState(true)

  async function handleLogout() {
    try {
      await sharedAxios.delete('auth/logout')
      if (user.role === 'doctor') {
        localStorage.removeItem('doctorAccessToken')
        localStorage.removeItem('doctor')
      } else {
        localStorage.removeItem('patientAccessToken')
        localStorage.removeItem('patient')
      }
      setUser(null)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.status === 401) {
        setUser(null)
      }
      console.error(err)
    }
  }

  if (sideBarOpen) {
    return (
      <div
        className="min-h-full bg-slate-400 w-full min-w-44 max-w-52 flex
        flex-col items-center gap-6 px-6 pt-4 text-white"
      >
        <p className="text-2xl font-semibold">DocAux</p>
        <p className="uppercase italic">{user.role} view</p>
        <UserCircleIcon className="w-24 text-gray-700" />
        {user.role === 'doctor' && (
          <>
            <NavigationItem
              icon={<ChartPieIcon />}
              text="Dashboard"
              route="/"
            />
            <NavigationItem
              icon={<CameraIcon />}
              text="Image Capture"
              route="/image-capture"
            />
          </>
        )}
        <NavigationItem
          icon={<ArrowRightIcon />}
          text="Logout"
          onClickCb={handleLogout}
        />
        <ArrowLeftIcon
          onClick={() => setSideBarOpen(false)}
          className="mt-auto pb-2 w-8 self-end cursor-pointer"
        />
      </div>
    )
  }
  return (
    <ArrowRightIcon
      onClick={() => setSideBarOpen(true)}
      className="mt-auto mx-1 pb-2 w-10 self-end cursor-pointer"
    />
  )
}

export default LeftSideBar
