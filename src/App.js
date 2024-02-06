import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppContext from './context/AppContext'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import Home from './components/Home'

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="bg-blue-100 min-h-screen">
          <Header />
          <div className="pb-8 px-4 md:px-2">
            <Routes>
              <Route path="/" element={<AuthenticatedRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppContext>
  )
}

export default App
