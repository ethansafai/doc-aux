function PatientsTable({ patients, onPatientClickCb = undefined }) {
  return (
    <div className="overflow-x-auto">
      <table
        className="text-gray-500 bg-white border-collapse w-full
          text-lg"
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
                <td
                  className="border-2 px-1 underline cursor-pointer text-blue-400"
                  onClick={() => {
                    onPatientClickCb(patient)
                  }}
                >
                  {patient.email}
                </td>
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
  )
}

export default PatientsTable
