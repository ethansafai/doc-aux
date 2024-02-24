import { cloneElement, useContext } from 'react'
import { UserContext } from '../context/AppContext'
import {
  UserCircleIcon,
  CalendarIcon,
  DocumentIcon,
  ChartBarIcon,
  ChartPieIcon,
  SupportIcon,
  ChatIcon,
  CameraIcon,
  ArrowRightIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  BellIcon,
} from '@heroicons/react/outline'

function LeftSideBar() {
  const { setUser } = useContext(UserContext)

  function handleLogout() {
    setUser(null)
  }

  function NavigationItem({ icon, text, onClickCb }) {
    return (
      <div className="flex gap-2 w-full">
        {cloneElement(icon, { className: 'w-6' })}
        <p className="cursor-pointer" onClick={onClickCb}>
          {text}
        </p>
      </div>
    )
  }

  // Implement handleImageCapture function when click on Image Capture
  function handleImageCapture() {
    window.location.href = '/image-capture'
  }

  return (
    <div
      className="min-h-full bg-slate-400 md:w-full md:min-w-44 max-w-52 
      md:flex flex-col items-center gap-6 px-6 pt-4 text-white hidden"
    >
      <p className="text-2xl font-semibold">DocAux</p>
      <UserCircleIcon className="w-24 text-gray-700" />
      <NavigationItem icon={<ChartPieIcon />} text="Dashboard" />
      <NavigationItem icon={<CalendarIcon />} text="Schedule" />
      <NavigationItem icon={<DocumentIcon />} text="Documents" />
      <NavigationItem icon={<ChartBarIcon />} text="Reports" />
      <NavigationItem icon={<SupportIcon />} text="Support" />
      <NavigationItem icon={<ChatIcon />} text="Messages" />
      <NavigationItem
        icon={<CameraIcon />}
        text="Image Capture"
        onClickCb={handleImageCapture}
      ></NavigationItem>
      <NavigationItem
        icon={<ArrowRightIcon />}
        text="Logout"
        onClickCb={handleLogout}
      />
    </div>
  )
}

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

function MainSection() {
  const { user } = useContext(UserContext)

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 w-full">
      {/* search bar on the right side */}
      <div className="flex justify-end">
        <input
          type="search"
          placeholder="🔍 Search"
          className="bg-gray-300 w-1/2 p-2 rounded-lg"
        />
      </div>

      <p className="text-xl md:text-2xl font-bold">
        Welcome, <span className="text-cyan-700">Dr. {user.lastName}!</span>
      </p>

      <div className="flex space-x-6">
        <button className="bg-gray-300 p-2 rounded-md">Capture Image</button>
        <button className="bg-gray-300 p-2 rounded-md">Upload Image</button>
      </div>

      <div>
        <img src="./images/image-capture-page.jpg" alt="/" />
      </div>

      <div className="flex justify-center space-x-10">
        <button className="bg-gray-300 p-2 rounded-md">Retake</button>
        <button className="bg-gray-300 p-2 rounded-md">Capture</button>
      </div>

      <div className="flex justify-end">
        <button className="bg-gray-300 w-1/3 p-2 rounded-md">Submit</button>
      </div>
    </div>
  )
}

function ImageCapture() {
  return (
    <div className="flex justify-between flex-1">
      <LeftSideBar />
      <MainSection />
      <RightSideBar />
    </div>
  )
}

export default ImageCapture
