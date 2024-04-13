import { useState } from 'react'
import sharedAxios from '../../../services/httpService'
import useInitialMount from '../../../hooks/useInitialMount'

function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)

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

  useInitialMount(loadPatients)

  return (
    <div className="shadow-md rounded-lg bg-slate-100 p-2">
      <p className="font-bold text-xl mb-2">Your Patients</p>
      <div className="border w-full border-gray-400 mb-2"></div>
      {loading && <p className="animate-pulse">Loading patients...</p>}
      <div className="overflow-x-auto">
        <table
          className="text-gray-500 bg-white border-collapse w-full
          text-lg whitespace-nowrap"
        >
          <thead className="text-gray-700 uppercase text-left">
            <tr>
              <th className="border-2 px-1">Email</th>
              <th className="border-2 px-1">Name</th>
              <th className="border-2 px-1">Street Address</th>
              <th className="border-2 px-1">City</th>
              <th className="border-2 px-1">State</th>
              <th className="border-2 px-1">Zip Code</th>
              <th className="border-2 px-1">Mobile #</th>
            </tr>
          </thead>
          <tbody>
            {!!patients.length &&
              patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="border-2 px-1">{patient.email}</td>
                  <td className="border-2 px-1">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="border-2 px-1">{patient.streetAddress}</td>
                  <td className="border-2 px-1">{patient.city}</td>
                  <td className="border-2 px-1">{patient.state}</td>
                  <td className="border-2 px-1">{patient.zipCode}</td>
                  <td className="border-2 px-1">{patient.mobileNo}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Patients
