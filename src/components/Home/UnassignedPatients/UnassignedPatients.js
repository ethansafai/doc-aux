import { AxiosError } from 'axios'
import { useContext, useState } from 'react'
import sharedAxios from '../../../services/httpService'
import useInitialMount from '../../../hooks/useInitialMount'
import PatientsTable from '../DoctorDashboard/PatientsTable'
import { UserContext } from '../../../context/AppContext'

function UnassignedPatients() {
  const { user } = useContext(UserContext)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, , setErrorMessage] = useState('')

  async function getPatientsWithNoDoctor() {
    setLoading(true)
    // setErrorMessage('')
    try {
      const { data } = await sharedAxios.get('patients/no-doctor')
      if (Array.isArray(data)) {
        setPatients(data)
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        // setErrorMessage(err.response.data.error)
      } else {
        // setErrorMessage('An error occurred while trying to notify the patient')
      }
    } finally {
      setLoading(false)
    }
  }

  async function assignSelfToPatient(patient) {
    setLoading(true)
    // setErrorMessage('')
    try {
      await sharedAxios.put(`patients/assign-doctor/${patient.id}`)
      alert(
        `Patient ${patient.firstName} ${patient.lastName} has been successfully assigned to you. You may return to your dashboard to see your updated list of patients.`
      )
      getPatientsWithNoDoctor()
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        // setErrorMessage(err.response.data.error)
      } else {
        // setErrorMessage('An error occurred while trying to notify the patient')
      }
    } finally {
      setLoading(false)
    }
  }

  useInitialMount(getPatientsWithNoDoctor)

  return (
    <div className="p-4 flex flex-col gap-4">
      <p className="text-xl md:text-2xl font-bold">
        Welcome, <span className="text-cyan-700">Dr. {user.lastName}!</span>
      </p>
      <div className="shadow-md rounded-lg bg-slate-100 p-2">
        <p className="font-bold text-xl mb-2">
          Patients With No Doctor{' '}
          <span className="italic">
            (click on a patient's email to assign them to you)
          </span>
        </p>
        <div className="border w-full border-gray-400 mb-2"></div>
        {loading && (
          <p className="animate-pulse font-medium mb-2">Loading patients...</p>
        )}
        {errorMessage && (
          <p className="text-red-500 font-medium mb-2">{errorMessage}</p>
        )}
        <PatientsTable
          patients={patients}
          onPatientClickCb={assignSelfToPatient}
        />
      </div>
    </div>
  )
}

export default UnassignedPatients
