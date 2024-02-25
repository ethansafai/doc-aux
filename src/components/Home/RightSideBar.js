import {
  BellIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { useContext } from 'react'
import { UserContext } from '../../context/AppContext'

function RightSideBar() {
  const { user } = useContext(UserContext)

  return (
    <div
      className="min-h-full bg-slate-400 hidden md:flex md:w-full 
  mid:min-w-44 max-w-52 flex-col"
    >
      <div className="flex-1 text-center text-white flex flex-col items-center">
        <div className="p-4 flex justify-end items-center gap-4 w-full">
          <QuestionMarkCircleIcon className="text-white w-6" />
          <CogIcon className="text-white w-6" />
        </div>
        <UserIcon className="text-white w-16 my-10" />
        <p>
          Dr. {user.firstName} {user.lastName}
        </p>
        <p className="text-xs mb-2">{user.emailAddress}</p>
        <p>{user.city}, USA</p>
      </div>
      <div className="flex-1 bg-slate-300">
        <div className="p-4 flex justify-between text-white">
          <p className="text-lg">Notifications</p>
          <BellIcon className="w-6" />
        </div>
      </div>
    </div>
  )
}

export default RightSideBar
