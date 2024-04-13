import { useContext, useState } from 'react'
import sharedAxios from '../../../services/httpService'
import useInitialMount from '../../../hooks/useInitialMount'
import { UserContext } from '../../../context/AppContext'

function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useContext(UserContext)

  async function loadNotifications() {
    setLoading(true)
    try {
      const { data } = await sharedAxios.get('patients/notifications')
      if (Array.isArray(data) && data.length > 0) {
        setNotifications(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useInitialMount(loadNotifications)

  return (
    <div className="shadow-md rounded-lg bg-slate-100 p-2">
      <p className="font-medium text-xl mb-2">Your Notifications</p>
      <div className="border w-full border-black mb-2"></div>
      {loading && <p className="animate-pulse">Loading patients...</p>}
      <ul className="bg-white flex flex-col gap-3 rouded-md">
        {!!notifications.length &&
          notifications.map((notification, index) => (
            <li
              className={`list-disc ml-6 ${
                index % 2 !== 0 ? 'bg-cyan-50' : undefined
              }`}
              key={notification.id}
            >
              <p className="text-lg px-1">
                <span className="italic text-base text-gray-500">
                  Dr. {user.doctor.firstName} {user.doctor.lastName}:{' '}
                </span>
                {notification.message}
              </p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Notifications
