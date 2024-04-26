import { useRef, useState } from 'react'
import sharedAxios from '../../../services/httpService'
import useInitialMount from '../../../hooks/useInitialMount'
import { AxiosError } from 'axios'
import PatientsTable from './PatientsTable'

function NotifyForm({ patient, handleClose }) {
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (inputRef.current === null) {
      return
    }

    setErrorMessage('')
    setSuccess(false)
    setLoading(true)
    try {
      await sharedAxios.post(`notifications/${patient.id}`, {
        message: inputRef.current.value,
      })
      setSuccess(true)
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        setErrorMessage(err.response.data.error)
      } else {
        setErrorMessage('An error occurred while trying to notify the patient')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="bg-slate-100 p-4 absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2 shadow-2xl"
    >
      <div className="flex flex-col gap-3">
        <button className="w-1/3 text-lg self-end" onClick={handleClose}>
          Close
        </button>
        <p className="text-slate-700 text-xl font-medium">
          Send a message to {patient.firstName} {patient.lastName}:
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            className="outline-none border border-slate-500 p-2 text-lg"
            rows={10}
            cols={100}
          ></textarea>
          <br />
          <div className="text-center my-1">
            <button className="w-1/2 text-lg">Send</button>
          </div>
        </form>
        <div className="text-lg font-medium">
          {loading && <p className="animate-pulse">Sending message...</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {success && (
            <p className="text-blue-600">
              Message sent successfully - You may close the window or send
              another message
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] = useState({
    open: false,
    patient: {},
  })

  async function loadPatients() {
    setLoading(true)
    try {
      const { data } = await sharedAxios.get('doctors/self')
      if (data?.patients) {
        setPatients(data.patients)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleOpenForm(patient) {
    setFormState({ open: true, patient })
  }

  function handleCloseForm() {
    setFormState({ open: false, patient: {} })
  }

  useInitialMount(loadPatients)

  return (
    <div className="shadow-md rounded-lg bg-slate-100 p-2">
      <p className="font-bold text-xl mb-2">Your Patients</p>
      <div className="border w-full border-gray-400 mb-2"></div>
      {loading && <p className="animate-pulse">Loading patients...</p>}
      <PatientsTable patients={patients} onPatientClickCb={handleOpenForm} />
      {formState.open && (
        <NotifyForm patient={formState.patient} handleClose={handleCloseForm} />
      )}
    </div>
  )
}

export default Patients
