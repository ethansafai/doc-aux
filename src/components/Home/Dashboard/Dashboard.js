import { useContext } from 'react'
import Conversations from './Conversations'
import DailyRead from './DailyRead'
import { UserContext } from '../../../context/AppContext'

function Dashboard() {
  const { user } = useContext(UserContext)

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 w-full">
      <p className="text-xl md:text-2xl font-bold">
        Welcome, <span className="text-cyan-700">Dr. {user.lastName}!</span>
      </p>
      <div className="flex flex-wrap gap-10 w-full">
        <Conversations />
        <DailyRead />
      </div>
    </div>
  )
}

export default Dashboard
