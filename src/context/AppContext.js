import { createContext, useState } from 'react'

export const UserContext = createContext()

function AppContext({ children }) {
  const [user, setUser] = useState({
    firstName: 'Ethan',
    lastName: 'Safai',
    emailAddress: 'ethan@safai.com',
    city: 'Los Angeles',
  }) // for testing

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default AppContext
