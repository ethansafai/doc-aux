import { useContext } from 'react'
import Conversations from './Conversations'
import DailyRead from './DailyRead'
import { UserContext } from '../../../context/AppContext'
import Patients from './Patients'
import doctorAndPatientImage from '../../../assets/images/doctor-and-patient-graphic.webp'

function DoctorDashboard() {
  const { user } = useContext(UserContext)

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 w-full pb-4">
      <h1 className="font-bold text-2xl text-blue-600 min-w-max text-center">
        DocAux - <span className="italic">Doctor Portal</span>
      </h1>
      <hr className="w-[90%] mx-auto border border-black" />
      <p className="text-xl md:text-2xl font-bold">
        Welcome, <span className="text-cyan-700">Dr. {user.lastName}!</span>
      </p>
      <div className="flex flex-wrap gap-10 w-full">
        <Conversations />
        <DailyRead />
      </div>
      <img
        src={doctorAndPatientImage}
        className="w-[28%] mx-auto my-4"
        alt="A graphic of a patient getting treated by doctors"
      />
      <Patients />
    </div>
  )
}

export default DoctorDashboard
