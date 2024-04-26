import { useContext, useState } from 'react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import sharedAxios from '../../../services/httpService'
import useInitialMount from '../../../hooks/useInitialMount'
import { UserContext } from '../../../context/AppContext'

function Conversations() {
  const { user } = useContext(UserContext)
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(false)

  async function getDoctors() {
    setLoading(true)
    try {
      const { data } = await sharedAxios.get('doctors/')
      if (Array.isArray(data)) {
        setConversations(data.filter((otherUser) => otherUser.id !== user.id))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useInitialMount(getDoctors)

  return (
    <div
      className="bg-white min-w-fit w-[50%] max-w-[30rem] p-2 rounded-xl
      shadow-md"
    >
      <p className="text-xl font-medium m-1 mb-1">Your Conversations</p>
      <div className="border w-full border-gray-400 mb-2"></div>
      <div className="max-h-52 overflow-y-auto pr-10">
        {loading ? (
          <p className="animate-pulse">Loading...</p>
        ) : (
          <div className="flex flex-col gap-2 text-sm">
            {conversations.map((otherDoctor) => (
              <div
                className="flex items-center justify-between p-2 border rounded-lg"
                key={otherDoctor.id}
              >
                <div className="flex items-center gap-2">
                  <div>
                    <p className="font-medium text-base">
                      {otherDoctor.firstName} {otherDoctor.lastName}
                    </p>
                    <p>
                      Send email to{' '}
                      <a href={`mailto:${otherDoctor.email}`}>
                        {otherDoctor.email}
                      </a>
                    </p>
                    <p>
                      {otherDoctor.practice?.telNo} -{' '}
                      {otherDoctor.practice?.name} ({otherDoctor.practice?.city}
                      , {otherDoctor.practice?.state})
                    </p>
                  </div>
                </div>
                <DotsVerticalIcon className="w-6 text-slate-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Conversations
