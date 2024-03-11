import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/AppContext'

function FormItem({
  itemName,
  name,
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
        type={inputType}
        required={required}
        onChange={onChangeCb}
        value={value}
        name={name}
      />
    </div>
  )
}

const initialFormData = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  password: '',
  dateOfBirth: '',
  medicalLicenseNumber: '',
  practiceName: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  telephoneNumber: '',
  mobileNumber: '',
}

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)
  const { setUser } = useContext(UserContext)

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  function createAccount(e) {
    e.preventDefault()

    setFormData(initialFormData)
    setUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailAddress: formData.emailAddress,
      city: formData.city,
    })

    navigate('/')
  }

  return (
    <form
      className="flex flex-col items-center gap-6 max-w-md mx-auto pb-8 px-4 
      md:px-2 pt-4"
      onSubmit={createAccount}
    >
      <p className="text-lg font-medium text-center">
        Please enter your information to create your account
      </p>
      <hr className="border border-gray-600 w-full" />
      <div className="flex flex-col items-center gap-4">
        <FormItem
          itemName="First Name"
          onChangeCb={handleChange}
          value={formData.firstName}
          name="firstName"
        />
        <FormItem
          itemName="Last Name"
          onChangeCb={handleChange}
          value={formData.lastName}
          name="lastName"
        />
        <FormItem
          itemName="Email Address"
          inputType="email"
          onChangeCb={handleChange}
          value={formData.emailAddress}
          name="emailAddress"
        />
        <FormItem
          itemName="Password"
          inputType="password"
          onChangeCb={handleChange}
          value={formData.password}
          name="password"
        />
        <FormItem
          itemName="Date of Birth"
          inputType="date"
          onChangeCb={handleChange}
          value={formData.dateOfBirth}
          name="dateOfBirth"
        />
        <FormItem
          itemName="Medical License Number"
          onChangeCb={handleChange}
          value={formData.medicalLicenseNumber}
          name="medicalLicenseNumber"
        />
        <FormItem
          itemName="Practice Name"
          onChangeCb={handleChange}
          value={formData.practiceName}
          name="practiceName"
        />
        <FormItem
          itemName="Street Address"
          onChangeCb={handleChange}
          value={formData.streetAddress}
          name="streetAddress"
        />
        <FormItem
          itemName="City"
          onChangeCb={handleChange}
          value={formData.city}
          name="city"
        />
        <FormItem
          itemName="State"
          onChangeCb={handleChange}
          value={formData.state}
          name="state"
        />
        <FormItem
          itemName="Zip Code"
          onChangeCb={handleChange}
          value={formData.zipCode}
          name="zipCode"
        />
        <FormItem
          itemName="Telephone Number"
          inputType="tel"
          onChangeCb={handleChange}
          value={formData.telephoneNumber}
          name="telephoneNumber"
        />
        <FormItem
          itemName="Mobile"
          inputType="tel"
          required={false}
          onChangeCb={handleChange}
          value={formData.mobileNumber}
          name="mobileNumber"
        />
      </div>
      <button className="w-28">Submit</button>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  )
}

export default Signup
