import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import AppContext from './context/AppContext'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home'

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="bg-blue-100 min-h-screen pb-8">
          <Header />
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  )
}

export default App
