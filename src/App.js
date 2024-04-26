import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppContext from './context/AppContext'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import Home from './components/Home/Home'
import ImageCapture from './components/Home/ImageCapture'
import DoctorDashboard from './components/Home/DoctorDashboard'
import PatientDashboard from './components/Home/PatientDashboard'
import UnassignedPatients from './components/Home/UnassignedPatients/UnassignedPatients'

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="bg-blue-100 min-h-screen flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<AuthenticatedRoute />}>
              {/* Doctor routes */}
              <Route
                path="/"
                element={
                  <Home>
                    <DoctorDashboard />
                  </Home>
                }
              />
              <Route
                path="/image-capture"
                element={
                  <Home>
                    <ImageCapture />
                  </Home>
                }
              />
              <Route
                path="/unassigned-patients"
                element={
                  <Home>
                    <UnassignedPatients />
                  </Home>
                }
              />
              {/* Patient Routes */}
              <Route
                path="/patient"
                element={
                  <Home>
                    <PatientDashboard />
                  </Home>
                }
              />
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
