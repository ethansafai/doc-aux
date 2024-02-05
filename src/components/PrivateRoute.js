import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { UserContext } from '../context/AppContext'

function PrivateRoute() {
  const { user } = useContext(UserContext)

  return user != null ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
