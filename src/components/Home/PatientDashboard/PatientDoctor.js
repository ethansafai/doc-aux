import { AxiosError } from 'axios'
import { useState } from 'react'
import sharedAxios from '../../../services/httpService'
import useInitialMount from '../../../hooks/useInitialMount'

function PatientDoctor() {
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getDoctor() {
    setLoading(true)
    try {
      const { data } = await sharedAxios.get('patients/self')
      if (data.doctor) {
        setDoctor(data.doctor)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useInitialMount(getDoctor)

  if (loading) {
    return (
      <div
        className="border bg-slate-100 min-h-32 min-w-80 p-2 rounded-lg
    shadow-md"
      >
        <p className="animate-pulse">Loading...</p>
      </div>
    )
  }

  if (doctor === null) {
    return (
      <div
        className="border bg-slate-100 min-h-32 min-w-80 p-2 rounded-lg
        shadow-md"
      >
        <p>You do not have a doctor assigned to you.</p>
      </div>
    )
  }

  return (
    <div className="border bg-slate-100 min-h-32 min-w-80 p-2 rounded-lg shadow-md">
      <p className="text-xl font-medium mb-2">Your Doctor:</p>
      <div className="border w-full border-black mb-2"></div>
      <div className="overflow-x-auto">
        <table className="text-gray-500 bg-white border-collapse w-full whitespace-nowrap">
          <thead className="text-gray-700 uppercase text-left">
            <tr>
              <th className="border-2 px-1">Email</th>
              <th className="border-2 px-1">Name</th>
              <th className="border-2 px-1">Medical License #</th>
              <th className="border-2 px-1">Street Address</th>
              <th className="border-2 px-1">City</th>
              <th className="border-2 px-1">State</th>
              <th className="border-2 px-1">Zip Code</th>
              <th className="border-2 px-1">Telephone #</th>
              <th className="border-2 px-1">Mobile #</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 px-1">{doctor.email}</td>
              <td className="border-2 px-1">
                {doctor.firstName} {doctor.lastName}
              </td>
              <td className="border-2 px-1">{doctor.medicalLicenseNo}</td>
              <td className="border-2 px-1">
                {doctor.practice?.streetAddress}
              </td>
              <td className="border-2 px-1">{doctor.practice?.city}</td>
              <td className="border-2 px-1">{doctor.practice?.state}</td>
              <td className="border-2 px-1">{doctor.practice?.zipCode}</td>
              <td className="border-2 px-1">{doctor.practice?.telNo}</td>
              <td className="border-2 px-1">{doctor.mobileNo}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientDoctor
