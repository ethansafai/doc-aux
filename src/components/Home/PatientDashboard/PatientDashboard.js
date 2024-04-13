import doctorAndPatientImage from '../../../assets/images/doctor-and-patient-graphic.webp'
import Notifications from './Notifications'
import PatientDoctor from './PatientDoctor'

function PatientDashboard() {
  return (
    <div className="mt-4 flex flex-col w-full px-2 gap-4">
      <h1 className="font-bold text-2xl text-blue-600 min-w-max text-center">
        DocAux - <span className="italic">Patient Portal</span>
      </h1>
      <hr className="w-[90%] mx-auto border border-black" />
      <PatientDoctor />
      <img
        src={doctorAndPatientImage}
        className="w-[40%] mx-auto my-4"
        alt="A graphic of a patient getting treated by doctors"
      />
      <Notifications />
    </div>
  )
}

export default PatientDashboard
