import { createContext, useState } from 'react'

export const UserContext = createContext()

function AppContext({ children }) {
  const [user, setUser] = useState(
    JSON.parse(
      localStorage.getItem('doctor') ?? localStorage.getItem('patient')
    )
  )

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default AppContext
