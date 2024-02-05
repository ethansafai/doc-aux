import { useState } from 'react'
import { Link } from 'react-router-dom'

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
        type={inputType}
        required={required}
        onChange={onChangeCb}
        value={value}
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
  const [formData, setFormData] = useState(initialFormData)

  function handleChange(fieldName, newValue) {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }))
  }

  function createAccount(e) {
    e.preventDefault()
    console.log(formData)
    setFormData(initialFormData)
  }

  return (
    <form
      className="flex flex-col items-center px-4 pt-2 md:px-2 gap-6 max-w-md 
        mx-auto"
      onSubmit={createAccount}
    >
      <p className="text-lg md:text-xl font-medium text-center">
        Please enter your information to create your account
      </p>
      <hr className="border border-gray-600 w-full" />
      <div className="flex flex-col items-center gap-4">
        <FormItem
          itemName="First Name"
          onChangeCb={(e) => handleChange('firstName', e.target.value)}
          value={formData.firstName}
        />
        <FormItem
          itemName="Last Name"
          onChangeCb={(e) => handleChange('lastName', e.target.value)}
          value={formData.lastName}
        />
        <FormItem
          itemName="Email Address"
          inputType="email"
          onChangeCb={(e) => handleChange('emailAddress', e.target.value)}
          value={formData.emailAddress}
        />
        <FormItem
          itemName="Password"
          inputType="password"
          onChangeCb={(e) => handleChange('password', e.target.value)}
          value={formData.password}
        />
        <FormItem
          itemName="Date of Birth"
          inputType="date"
          onChangeCb={(e) => handleChange('dateOfBirth', e.target.value)}
          value={formData.dateOfBirth}
        />
        <FormItem
          itemName="Medical License Number"
          onChangeCb={(e) =>
            handleChange('medicalLicenseNumber', e.target.value)
          }
          value={formData.medicalLicenseNumber}
        />
        <FormItem
          itemName="Practice Name"
          onChangeCb={(e) => handleChange('practiceName', e.target.value)}
          value={formData.practiceName}
        />
        <FormItem
          itemName="Street Address"
          onChangeCb={(e) => handleChange('streetAddress', e.target.value)}
          value={formData.streetAddress}
        />
        <FormItem
          itemName="City"
          onChangeCb={(e) => handleChange('city', e.target.value)}
          value={formData.city}
        />
        <FormItem
          itemName="State"
          onChangeCb={(e) => handleChange('state', e.target.value)}
          value={formData.state}
        />
        <FormItem
          itemName="Zip Code"
          onChangeCb={(e) => handleChange('zipCode', e.target.value)}
          value={formData.zipCode}
        />
        <FormItem
          itemName="Telephone Number"
          inputType="tel"
          onChangeCb={(e) => handleChange('telephoneNumber', e.target.value)}
          value={formData.telephoneNumber}
        />
        <FormItem
          itemName="Mobile"
          inputType="tel"
          required={false}
          onChangeCb={(e) => handleChange('mobileNumber', e.target.value)}
          value={formData.mobileNumber}
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
