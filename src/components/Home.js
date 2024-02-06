import { useContext } from 'react'
import { UserContext } from '../context/AppContext'

function Home() {
  const { user, setUser } = useContext(UserContext)

  function handleLogout() {
    setUser(null)
  }

  // TODO: implement login screen (this is placeholder code)
  return (
    <div className="flex flex-col gap-4 justify-center">
      <h1 className="text-lg font-bold text-center">
        Welcome, {user.firstName} {user.lastName}
      </h1>
      <button
        type="button"
        className="mx-auto w-32 block bg-white"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  )
}

export default Home
