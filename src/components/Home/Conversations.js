import { useEffect, useState } from 'react'
import { getConversations } from '../../api/userApi'
import { DotsVerticalIcon } from '@heroicons/react/outline'

function Conversations() {
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    async function populateConversations() {
      const result = await getConversations()
      setConversations(result)
    }
    populateConversations()
  }, [])

  return (
    <div className="bg-white min-w-fit w-[50%] max-w-[20rem] p-2 rounded-xl shadow-md">
      <p className="text-xl font-medium m-1">Your Conversations</p>
      <div className="max-h-52 overflow-y-auto pr-10">
        {conversations.map(({ name, date, image }) => (
          <div className="flex items-center justify-between p-2" key={name}>
            <div className="flex items-center gap-2">
              <img
                loading="lazy"
                src={image}
                className="w-12 h-12 rounded-full"
                alt={name}
              />
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-gray-400">{date}</p>
              </div>
            </div>
            <DotsVerticalIcon className="w-10 text-slate-500" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Conversations
