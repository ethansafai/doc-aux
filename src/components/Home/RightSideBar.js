import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/AppContext'

function RightSideBar() {
  const { user } = useContext(UserContext)
  const [sideBarOpen, setSideBarOpen] = useState(true)

  if (sideBarOpen) {
    return (
      <div
        className="min-h-full bg-slate-400 flex w-full min-w-44 max-w-52 
        flex-col"
      >
        <div className="flex-1 text-center text-white flex flex-col items-center">
          <div className="p-4 flex justify-end items-center gap-4 w-full">
            <QuestionMarkCircleIcon className="text-white w-6" />
            <CogIcon className="text-white w-6" />
          </div>
          <UserIcon className="text-white w-16 my-10" />
          {user.role === 'doctor' ? (
            <>
              <p>
                Dr. {user.firstName} {user.lastName}
              </p>
              <p className="text-xs mb-2">{user.email}</p>
              <p>
                {user.practice?.city}, {user.practice?.state}, USA
              </p>
            </>
          ) : (
            <>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs mb-2">{user.email}</p>
              <p>
                {user.city}, {user.state}, USA
              </p>
            </>
          )}
        </div>
        <div className="flex-1 bg-slate-300 flex flex-col px-2">
          <div className="p-4 flex justify-between text-white">
            <p className="text-lg">Notifications</p>
            <BellIcon className="w-6" />
          </div>
          <ArrowRightIcon
            onClick={() => setSideBarOpen(false)}
            className="mt-auto pb-2 w-8 self-start cursor-pointer text-white"
          />
        </div>
      </div>
    )
  }
  return (
    <ArrowLeftIcon
      onClick={() => setSideBarOpen(true)}
      className="mt-auto mx-1 pb-2 w-10 cursor-pointer"
    />
  )
}

export default RightSideBar
