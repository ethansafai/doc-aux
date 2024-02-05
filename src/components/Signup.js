import { useState } from 'react'

function FormItem({
  itemName,
  onChangeCb,
  value,
  inputType = 'text',
  required = true,
}) {
  return (
    <div className="flex gap-2 justify-between w-full">
      <p className="text-sm md:text-base">
        {itemName} {required && <span className="text-red-500">*</span>}
      </p>
      <input
        className="md:px-1 md:py-[2px] rounded-md outline-none focus:shadow-md
        focus:outline-blue-300 transition-all duration-300 ease-in-out"
        type={inputType}
        required={required}
        onChange={onChangeCb}
        value={value}
      />
    </div>
  )
}

function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [medicalLicenseNumber, setMedicalLicenseNumber] = useState('')
  const [practiceName, setPracticeName] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [telephoneNumber, setTelephoneNumber] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')

  function createAccount(e) {
    e.preventDefault()

    setFirstName('')
    setLastName('')
    setPassword('')
    setEmailAddress('')
    setDateOfBirth('')
    setMedicalLicenseNumber('')
    setPracticeName('')
    setStreetAddress('')
    setCity('')
    setState('')
    setZipCode('')
    setTelephoneNumber('')
    setMobileNumber('')
  }

  return (
    <form
      className="flex flex-col items-center gap-6 p-2 max-w-md mx-auto"
      onSubmit={createAccount}
    >
      <p className="text-lg md:text-xl font-medium text-center">
        Please enter your information to create your account
      </p>
      <hr className="border border-gray-600 w-full" />
      <div className="flex flex-col items-center gap-4">
        <FormItem
          itemName="First Name"
          onChangeCb={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <FormItem
          itemName="Last Name"
          onChangeCb={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <FormItem
          itemName="Password"
          inputType="password"
          onChangeCb={(e) => setPassword(e.target.value)}
          value={password}
        />
        <FormItem
          itemName="Email Address"
          inputType="email"
          onChangeCb={(e) => setEmailAddress(e.target.value)}
          value={emailAddress}
        />
        <FormItem
          itemName="Date of Birth"
          inputType="date"
          onChangeCb={(e) => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
        />
        <FormItem
          itemName="Medical License Number"
          onChangeCb={(e) => setMedicalLicenseNumber(e.target.value)}
          value={medicalLicenseNumber}
        />
        <FormItem
          itemName="Practice Name"
          onChangeCb={(e) => setPracticeName(e.target.value)}
          value={practiceName}
        />
        <FormItem
          itemName="Street Address"
          onChangeCb={(e) => setStreetAddress(e.target.value)}
          value={streetAddress}
        />
        <FormItem
          itemName="City"
          onChangeCb={(e) => setCity(e.target.value)}
          value={city}
        />
        <FormItem
          itemName="State"
          onChangeCb={(e) => setState(e.target.value)}
          value={state}
        />
        <FormItem
          itemName="Zip Code"
          onChangeCb={(e) => setZipCode(e.target.value)}
          value={zipCode}
        />
        <FormItem
          itemName="Telephone Number"
          inputType="tel"
          onChangeCb={(e) => setTelephoneNumber(e.target.value)}
          value={telephoneNumber}
        />
        <FormItem
          itemName="Mobile"
          inputType="tel"
          required={false}
          onChangeCb={(e) => setMobileNumber(e.target.value)}
          value={mobileNumber}
        />
      </div>
      <button
        className="px-4 py-1 rounded-full bg-white shadow-md font-medium
      hover:bg-gray-100 transition-all duration-150 ease-in-out w-28"
      >
        Submit
      </button>
    </form>
  )
}

export default Signup
