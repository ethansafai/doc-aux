import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/AppContext'
import { AxiosError } from 'axios'
import sharedAxios from '../services/httpService'

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
  email: '',
  password: '',
  dob: '',
  medicalLicenseNo: '',
  practiceName: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  telNo: '',
  mobileNo: '',
}

function Signup() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState(initialFormData)
  const [role, setRole] = useState('patient')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  async function createAccount(e) {
    e.preventDefault()

    setLoading(true)
    setErrorMessage('')
    try {
      if (role !== 'doctor' && role !== 'patient') {
        throw new Error(`Invalid value for 'role': ${role}`)
      }

      let submitData = {}
      if (role === 'doctor') {
        submitData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          dob: formData.dob,
          medicalLicenseNo: formData.medicalLicenseNo,
          practice: {
            name: formData.practiceName,
            streetAddress: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            telNo: formData.telNo,
          },
        }
        // Optional field
        if (formData.mobileNo) {
          submitData.mobileNo = formData.mobileNo
        }
      } else {
        submitData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          dob: formData.dob,
          streetAddress: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          mobileNo: formData.mobileNo,
        }
      }

      let url = ''
      if (role === 'doctor') {
        url = 'doctors'
      } else {
        url = 'patients'
      }

      const { data } = await sharedAxios.post(`${url}/`, submitData)
      if (data?.accessToken && data?.user) {
        setUser({ ...data.user, role })
        if (role === 'doctor') {
          localStorage.setItem('doctorAccessToken', data.accessToken)
          localStorage.setItem('doctor', JSON.stringify({ ...data.user, role }))
          navigate('/')
        } else {
          localStorage.setItem('patientAccessToken', data.accessToken)
          localStorage.setItem(
            'patient',
            JSON.stringify({ ...data.user, role })
          )
          navigate('/patient')
        }
      } else {
        throw new Error(`Unexpected data from server: ${data}`)
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data?.error ?? 'An error occurred')
      } else {
        console.error(err)
        setErrorMessage('An error occurred')
      }
    } finally {
      setLoading(false)
      setFormData(initialFormData)
      setErrorMessage('')
    }
  }

  return (
    <form
      className="flex flex-col items-center gap-6 max-w-md mx-auto pb-8 px-4 
      md:px-2 pt-4 font-medium"
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
          value={formData.email}
          name="email"
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
          value={formData.dob}
          name="dob"
        />
        {role === 'doctor' && (
          <FormItem
            itemName="Medical License Number"
            onChangeCb={handleChange}
            value={formData.medicalLicenseNo}
            name="medicalLicenseNo"
          />
        )}
        {role === 'doctor' && (
          <FormItem
            itemName="Practice Name"
            onChangeCb={handleChange}
            value={formData.practiceName}
            name="practiceName"
          />
        )}
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
        {role === 'doctor' && (
          <FormItem
            itemName="Telephone Number"
            inputType="tel"
            onChangeCb={handleChange}
            value={formData.telNo}
            name="telNo"
          />
        )}
        <FormItem
          itemName="Mobile"
          inputType="tel"
          required={role === 'patient'}
          onChangeCb={handleChange}
          value={formData.mobileNo}
          name="mobileNo"
        />
        <div className="flex items-center gap-3 mb-4">
          <p className="font-medium">I am a: </p>
          <select
            onChange={(e) => setRole(e.target.value)}
            className="px-2 py-1 rounded-md bg-slate-100 outline-none border
          border-blue-500"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
      </div>
      <button className="w-28">Submit</button>
      {loading && <p className="animate-pulse">Creating your account...</p>}
      {errorMessage && (
        <p className="text-red-500 font-medium">{errorMessage}</p>
      )}
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  )
}

export default Signup
